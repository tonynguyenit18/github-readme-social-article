import express, { Request, Response } from "express"
import {
  articlesTemplateByUserName,
  articleTemplateByUserNameAndArticleId,
  articleTemplateByUserNameAndIndex
} from "./service"
const router = express.Router()

router.get("/:userName", async (req: Request, res: Response) => {
  const { userName } = req.params
  const { top } = req.query

  const template = await articlesTemplateByUserName({ userName, devtoOptions: { top: top && parseInt(top as string) } })
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(template)
})

router.get("/:userName/:index", async (req: Request, res: Response) => {
  const { userName, index } = req.params
  let articleIndex = Number(index)
  let template = ""
  if (articleIndex || articleIndex === 0) {
    template = await articleTemplateByUserNameAndIndex({ userName, articleIndex })
  } else {
    template = await articleTemplateByUserNameAndArticleId({ userName, articleId: index })
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(template)
})

export { router as devtoRouter }
