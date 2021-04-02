import express, { Request, Response } from "express"
import { generateMediumTemplate } from "../../utils/svgTemplates"
import { mediumRecentArticles } from "./apis"
const router = express.Router()

router.get("/:userName/:index", async (req: Request, res: Response) => {
  const { userName, index } = req.params
  const articleIndex = parseInt(index)
  const recentArticles = await mediumRecentArticles({ userName, index: articleIndex })
  const mediumTemplates = recentArticles.map((mediumArticle) => {
    return generateMediumTemplate({ mediumArticle })
  })
  res.send(mediumTemplates[0])
})

export { router as mediumRouter }
