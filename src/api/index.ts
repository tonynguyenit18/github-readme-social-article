import express from "express"
const app = express()
import { mediumRouter } from "../services/medium/router"
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/health", (req, res) => {
  res.send("Healthy")
})

app.use("/medium", mediumRouter)

module.exports = app
