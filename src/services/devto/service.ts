import moment from "moment"
import { imgLinkToBase64 } from "../../utils/imgLinkToBase64"
import { generateDevtoTemplate } from "../../utils/svgTemplates"
import { devtoRecentArticles } from "./apis"
import { DevtoArticle, DevtoOptions } from "./type"

const descriptionMax = 50
const titleMax = 80

const shortenDescription = (description) => {
  const defaultContinue = " Continue reading on Dev.to »"
  description = description
    ?.replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "")
    .substring(0, descriptionMax)
  if (description.length <= descriptionMax - defaultContinue.length) {
    description += defaultContinue
  }
  description += "..."

  return description
}

const getFormattedArticles = async ({ articles }: { articles: DevtoArticle[] }) => {
  const imgLinkBase64Promises = articles.map((article) => imgLinkToBase64(article.thumbnail))

  const imgLinkBase64List = await Promise.all(imgLinkBase64Promises)
  const imgLinkBase64Doc: { [link: string]: string } = {}
  imgLinkBase64List.forEach(({ link, base64 }) => {
    imgLinkBase64Doc[link] = base64
  })

  const formattedArticles = articles.map((devtoArticle) => {
    return {
      ...devtoArticle,
      title:
        devtoArticle.title.length > titleMax
          ? devtoArticle.title.substring(0, titleMax).replace("&", "&amp;") + " ..."
          : devtoArticle.title.replace("&", "&amp;"),
      thumbnail: imgLinkBase64Doc[devtoArticle.thumbnail],
      date: moment(devtoArticle.date).format("DD MMM YYYY, HH:mm"),
      description: shortenDescription(devtoArticle.description).replace("&", "&amp;") // & is invalid symbol for svg text, need to escape
    }
  })

  return formattedArticles
}

export const articlesTemplateByUserName = async ({
  userName,
  index,
  devtoOptions
}: {
  userName: string
  index?: number
  devtoOptions?: DevtoOptions
}) => {
  let recentArticles = await devtoRecentArticles({ userName: userName, devtoOptions: devtoOptions })

  recentArticles = await getFormattedArticles({ articles: recentArticles })

  const template = generateDevtoTemplate({ devtoArticles: recentArticles })
  return template
}
