import express from "express"
const app = express()
import { mediumRouter } from "./services/medium/router"
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/medium", mediumRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
