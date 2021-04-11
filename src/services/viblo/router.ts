import express, { Request, Response } from "express"
import {
  articlesTemplateByUserName,
  articleTemplateByUserNameAndArticleId,
  articleTemplateByUserNameAndIndex
} from "./service"

const router = express.Router()

router.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params
  const { top } = req.query

  const template = await articlesTemplateByUserName({ username, vibloOptions: { top: top && Number(top) } })
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(template)
})

router.get("/:username/:index", async (req: Request, res: Response) => {
  const { username, index } = req.params
  let articleIndex = Number(index)
  let template = ""
  if (articleIndex || articleIndex === 0) {
    template = await articleTemplateByUserNameAndIndex({ username, articleIndex })
  } else {
    template = await articleTemplateByUserNameAndArticleId({ username, articleId: index })
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(template)
})

export { router as vibloRouter }
