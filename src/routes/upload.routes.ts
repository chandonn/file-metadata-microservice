import { Router, Request, Response } from "express";
import { container } from "tsyringe"
import multer from "multer"

import { FileUploadController } from "@/controller/file-upload-controller";
import { fileHandler } from "@/middleware/file-handler";

const upload = multer()

const uploadRouter = Router()

const fileUploadController = container.resolve(FileUploadController)

uploadRouter.post(
  "/",
  upload.array("files", 5),
  fileHandler,
  async (request: Request, response: Response) => {
    const { statusCode, body } = await fileUploadController.handle({
      body: request.body
    })

    return response.status(statusCode).json(body)
  }
)

export default uploadRouter