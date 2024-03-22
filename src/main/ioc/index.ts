import { container } from "tsyringe"

import { AWSFileUploader } from "@/infra/aws-file-uploader"
import { FileUploader } from "@/application/protocols"
import { RemoteFileUpload } from "@/domain/usecases/remote-file-upload"
import { FileUpload } from "@/domain/usecases"

container.registerSingleton<FileUploader>("FileUploader", AWSFileUploader)
container.registerSingleton<FileUpload>("FileUpload", RemoteFileUpload)