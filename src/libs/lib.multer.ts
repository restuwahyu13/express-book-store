import multer, { FileFilterCallback } from 'multer'
import { Request, Express } from 'express'
import { extensionSupport } from '../helpers/helper.extension'
import { BookStoreError } from '../helpers/helper.error'

export const upload = multer({
  storage: multer.diskStorage({
    destination(_: Request, file: Express.Multer.File, done) {},
    filename(req, file, done) {}
  }),
  fileFilter(_: Request, file: Express.Multer.File, done: FileFilterCallback) {
    if (extensionSupport(file.fieldname)) {
      throw new BookStoreError('File format not supported')
    }
    done(null, true)
  },
  limits: {
    fileSize: 2000000
  }
}) as multer.Multer
