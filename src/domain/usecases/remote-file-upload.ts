import { inject, injectable } from "tsyringe"

import { File, UploadedFile } from "@/domain/models"
import { FileUpload } from "@/domain/usecases"
import { FileUploader } from "@/application/protocols"
import { FileUploadError } from "@/domain/errors"

@injectable()
export class RemoteFileUpload implements FileUpload {
  constructor(
    @inject("FileUploader") private readonly fileUploader: FileUploader
  ) {}

  async upload(files: File[] | File): Promise<UploadedFile | UploadedFile[]> {
    const uploadedFiles = await this.fileUploader.upload(files)

    if (!uploadedFiles) {
      throw new FileUploadError()
    }

    return uploadedFiles
  }
}