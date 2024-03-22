import "reflect-metadata"
import "@/main/ioc"

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { uploadRouter } from "@/routes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/upload", uploadRouter)

app.get("/", function(request, response) {
  response.send("File upload microservice. Requests for '/upload'")
})

app.listen(process.env.PORT, function() {
  console.log("Application started at port 3000")
})

export default app