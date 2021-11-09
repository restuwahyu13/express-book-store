import cloudinary, { UploadApiResponse } from 'cloudinary'
import { BookStoreError } from '../helpers/helper.error'

export const cloudinaryStorage = async (filename: string): Promise<UploadApiResponse> => {
  try {
    const cloudStorage = cloudinary.v2
    cloudStorage.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      shorten: true,
      secure: true,
      force_version: true,
      ssl_detected: true
    })
    const res = (await cloudStorage.uploader.upload(filename, { resource_type: 'auto' })) as UploadApiResponse
    return res
  } catch (e: any) {
    return Promise.reject(new BookStoreError(`Uploading file error: ${e.message}`))
  }
}
