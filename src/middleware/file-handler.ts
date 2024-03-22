import { File } from "@/domain/models";
import { Request, Response, NextFunction } from "express"

export const fileHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { files } = request
  const mappedFiles: File[] = ((files as Express.Multer.File[]) || []).map(
    file => ({
      name: file.originalName,
      type: file.mimetype,
      content: file.buffer,
      size: file.size,
      extension: `${file.originalName.split(".").pop()}`,
    })
  )

  Object.assign(request.body, { files: mappedFiles })

  return next()
}