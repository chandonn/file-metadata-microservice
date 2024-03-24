import express, { Request, Response } from "express"
import cors from "cors"
import AWS from "aws-sdk"
import dotenv from "dotenv"
import path from "path"
import multer from "multer"

dotenv.config()
// create app server
const app = express()
// init multer with default configs
const upload = multer()
// config cors
app.use(cors())

// configs what will be used around the service
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

// instantiate AWS
const amazon = new AWS.S3()
// serves public folder statically
app.use("/public", express.static(path.join(process.cwd(), "public")))
// serves the main view to the home get endpoint
app.get("/", function(_, response: express.Response) {
  response.sendFile(path.join(process.cwd(), "views", "index.html"))
})

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function(request: Request, response: Response,
  ) {
  const name = request.file.originalname
  const type = request.file.mimetype
  const size = request.file.size

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: name,
    Body: request.file.buffer
  }

  amazon.upload(params, (error: unknown, data: unknown) => {
    if (error) {
      console.log("Error ocurred", error)
      response.status(500).json({ error: "Server error" })
    } else {
      console.log("File uploaded with success", data)
      response.status(200).json({ message: "The file was added with success", name, type, size })
    }
  })
})

app.listen(process.env.PORT, function() {
  console.log("App is running")
})