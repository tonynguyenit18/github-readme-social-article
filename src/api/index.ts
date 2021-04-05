import express from "express"
const app = express()
import { mediumRouter } from "../services/medium/router"
import { devtoRouter } from "../services/devto/router"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/health", (req, res) => {
  res.send("Healthy")
})

app.use("/medium", mediumRouter)

app.use("/devto", devtoRouter)

module.exports = app
