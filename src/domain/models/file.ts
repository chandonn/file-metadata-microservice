// node environments do not have file type, we need that to handle file metadata
export interface File {
  name: string
  size: number
  type: string
  extension: string
  content: ArrayBuffer
}
// the file being uploaded
export interface UploadedFile {
  path: string
}