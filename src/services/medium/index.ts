import express, { Request, Response } from "express"
import { generateMediumTemplate } from "../../utils/svgTemplates"
import { mediumRecentArticles } from "./apis"
const router = express.Router()

router.get("/:userName", async (req: Request, res: Response) => {
  const { userName } = req.params
  res.send(`Hello ${userName}`)
})

export { router as mediumRouter }
