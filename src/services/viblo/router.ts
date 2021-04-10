import express, { Request, Response } from "express"
import { articlesTemplateByUserName } from "./service"

const router = express.Router()

router.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params
  const { top } = req.query

  const template = await articlesTemplateByUserName({ username, vibloOptions: { top: top && Number(top) } })
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(template)
})

export { router as vibloRouter }
