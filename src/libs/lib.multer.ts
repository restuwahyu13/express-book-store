import multer, { FileFilterCallback } from 'multer'
import { Request, Express } from 'express'
import fs from 'fs'

import { extensionSupport } from '../helpers/helper.extension'
import { BookStoreError } from '../helpers/helper.error'

export const upload = multer({
  storage: multer.diskStorage({
    destination(_: Request, file: Express.Multer.File, done: any) {
      const linux: string = '/tmp'
      const window: string = process.env.TEMP || ''

      if (!file) {
        done(new BookStoreError('Uploading file failed'), null)
      } else {
        if (process.platform === 'win32') {
          if (fs.existsSync(window)) {
            done(null, window)
          } else {
            done(new BookStoreError('No such file directory'), null)
          }
        } else {
          if (fs.existsSync(linux)) {
            done(null, linux)
          } else {
            done(new BookStoreError('No such file directory'), null)
          }
        }
      }
    },
    filename(_, file, done: any) {
      if (!file) {
        done(new BookStoreError('Get file upload failed'), null)
      }
      done(null, file.originalname)
    }
  }),
  fileFilter(_: Request, file: Express.Multer.File, done: FileFilterCallback) {
    if (!extensionSupport(file.mimetype) || !file) {
      throw new BookStoreError('File format not supported')
    }
    done(null, true)
  },
  limits: { fileSize: 2000000 }
}) as multer.Multer
