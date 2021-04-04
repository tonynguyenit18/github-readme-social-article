import axios from "axios"
import moment from "moment"

export type MediumArticle = {
  title: string
  thumbnail: string
  url: string
  date: string
  description: string
}

const getThumbnailFromRawArticleParagraphsJson = (rawParagraphs) => {
  let thumbnailUrlId
  for (let i = 0; i < rawParagraphs.length; i++) {
    const paragraph = rawParagraphs[i]
    if (paragraph?.type === 4) {
      thumbnailUrlId = paragraph.metadata?.id
      break
    }
  }

  const thumbnailUrl = `https://miro.medium.com/max/150/${thumbnailUrlId}`

  return thumbnailUrl
}

const shortenDescription = (description) => {
  const defaultContinue = " Continue reading on Medium »"

  description = description?.replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "").substring(0, 60)
  if (description.length <= 60 - defaultContinue.length) {
    description += defaultContinue
  }
  description += "..."

  return description
}

export const mediumRecentArticles = async ({
  userName,
  index
}: {
  userName: string
  index: number
}): Promise<MediumArticle[]> => {
  const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${userName}`
  const { data } = await axios.get(rssUrl)
  let { items } = data || {}
  if (index || index === 0) {
    items = [items?.[index]]
  }

  const recentArticle: MediumArticle[] = items?.map(({ title, thumbnail, link, pubDate, description }) => {
    return {
      title: title,
      thumbnail: thumbnail,
      url: link,
      date: moment(pubDate).format("DD MMM YYYY, HH:mm"),
      description: shortenDescription(description)
    }
  })

  return recentArticle
}

export const mediumArticleById = async ({
  userName,
  articleId
}: {
  userName: string
  articleId: string
}): Promise<MediumArticle> => {
  const mediumUrl = `https://medium.com/${userName}/${articleId}?format=json`
  let { data: dataString } = await axios.get(mediumUrl)

  // dataString has some dirty characters. ])}while(1);</x>{main_object here}
  const pattern = /^[\w|\W]*?(\{[\w|\W]*)$/gi
  pattern.test(dataString)
  dataString = RegExp.$1

  // In main object there are some invalid json syntax (\\") which generated if in article have some code style.
  // Need to clean up to get valid json
  dataString.replace(`\\"`, "")

  const rawArticle = JSON.parse(dataString)
  const articleValue = rawArticle?.payload?.value || {}
  const title = articleValue.title
  const thumbnail = getThumbnailFromRawArticleParagraphsJson(articleValue.content?.bodyModel?.paragraphs)
  const url = articleValue.mediumUrl

  const mediumArticle = {
    title: title,
    thumbnail: thumbnail,
    url: url,
    date: moment(articleValue.firstPublishedAt).format("DD MMM YYYY, HH:mm"),
    description: shortenDescription(articleValue?.content?.subtitle)
  }
  return mediumArticle
}
