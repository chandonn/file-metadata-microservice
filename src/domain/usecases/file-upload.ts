// as per Domain Drive Design, this is the contract
// where we specify what use cases the application need to have
import { File, UploadedFile } from "@/domain/models";

export interface FileUpload {
  upload: (files: File[]) => Promise<UploadedFile[]>
}
