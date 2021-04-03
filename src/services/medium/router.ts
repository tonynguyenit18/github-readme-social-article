import express, { Request, Response } from "express"
import { generateMediumTemplate } from "../../utils/svgTemplates"
import { mediumRecentArticles } from "./apis"
import { imgLinkToBase64 } from "../../utils/imgLinkToBase64"
const router = express.Router()

router.get("/:userName", async (req: Request, res: Response) => {
  const { userName, index } = req.params
  const articleIndex = parseInt(index)

  const recentArticles = await mediumRecentArticles({ userName, index: articleIndex })
  let response = "<div>"
  recentArticles.forEach((mediumArticle) => {
    const template = generateMediumTemplate({ mediumArticle })
    response += template
  })
  response += "</div>"
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(response)
})

router.use("/:userName/:index", async (req: Request, res: Response) => {
  const { userName, index } = req.params
  const articleIndex = parseInt(index)
  const recentArticles = await mediumRecentArticles({ userName, index: articleIndex })

  const imgLinkBase64Promises = recentArticles.map((article) => imgLinkToBase64(article.thumbnail))

  const imgLinkBase64List = await Promise.all(imgLinkBase64Promises)
  const imgLinkBase64Doc: { [link: string]: string } = {}
  imgLinkBase64List.forEach(({ link, base64 }) => {
    imgLinkBase64Doc[link] = base64
  })

  const mediumTemplates = recentArticles.map((mediumArticle) => {
    mediumArticle = { ...mediumArticle, thumbnail: imgLinkBase64Doc[mediumArticle.thumbnail] }
    return generateMediumTemplate({ mediumArticle })
  })
  res.set("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.set("Content-Type", "image/svg+xml")
  res.send(mediumTemplates[0])
})

export { router as mediumRouter }
