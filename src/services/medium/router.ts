import express, { Request, Response } from "express"
import { generateMediumTemplate } from "../../utils/svgTemplates"
import { mediumRecentArticles } from "./apis"
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
  res.set("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.set("Content-Type", "image/svg+xml")
  res.send(response)
})

router.use("/:userName/:index", async (req: Request, res: Response) => {
  const { userName, index } = req.params
  const articleIndex = parseInt(index)
  const recentArticles = await mediumRecentArticles({ userName, index: articleIndex })
  const mediumTemplates = recentArticles.map((mediumArticle) => {
    return generateMediumTemplate({ mediumArticle })
  })
  res.set("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.set("Content-Type", "image/svg+xml")
  res.send(mediumTemplates[0])
})

export { router as mediumRouter }
