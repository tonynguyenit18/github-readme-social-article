import express from "express"
const app = express()
import { mediumRouter } from "./services/medium"
const PORT = 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/medium", mediumRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
