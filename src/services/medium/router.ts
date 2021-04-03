import express, { Request, Response } from "express"
import { generateMediumTemplate } from "../../utils/svgTemplates"
import { mediumRecentArticles } from "./apis"
import { imgLinkToBase64 } from "../../utils/imgLinkToBase64"
const router = express.Router()

const getTemplate = async ({ userName, articleIndex }: { userName: string; articleIndex: number }) => {
  let recentArticles = await mediumRecentArticles({ userName, index: articleIndex })

  const imgLinkBase64Promises = recentArticles.map((article) => imgLinkToBase64(article.thumbnail))

  const imgLinkBase64List = await Promise.all(imgLinkBase64Promises)
  const imgLinkBase64Doc: { [link: string]: string } = {}
  imgLinkBase64List.forEach(({ link, base64 }) => {
    imgLinkBase64Doc[link] = base64
  })

  recentArticles = recentArticles.map((mediumArticle) => {
    return { ...mediumArticle, thumbnail: imgLinkBase64Doc[mediumArticle.thumbnail] }
  })

  const template = generateMediumTemplate({ mediumArticles: recentArticles })
  return template
}

router.get("/:userName", async (req: Request, res: Response) => {
  const { userName, index } = req.params
  const articleIndex = parseInt(index)

  const template = await getTemplate({ userName, articleIndex })
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(template)
})

router.use("/:userName/:index", async (req: Request, res: Response) => {
  const { userName, index } = req.params
  const articleIndex = parseInt(index)

  const template = await getTemplate({ userName, articleIndex })
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(template)
})

export { router as mediumRouter }
