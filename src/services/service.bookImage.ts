import { StatusCodes as status } from 'http-status-codes'
import { Express } from 'express'

import { ModelBookImage } from '../models/model.book'
import { IServiceBookImage, IBookImage } from '../interfaces/interface.book'
import { Request } from '../helpers/helper.generic'
import { cloudinaryStorage } from '../libs/lib.cloudinary'

export class ServiceBookImage extends ModelBookImage implements IServiceBookImage {
  /**
   * @method POST
   * @description function for created uploading file image for specific book id
   */

  public async createServiceBookImage(req: Request<IBookImage>): Promise<Record<string, any>> {
    try {
      const checkBookImage: ModelBookImage = await super.model().query().where({ book_id: req.body.book_id }).first()

      if (checkBookImage) {
        throw { code: status.CONFLICT, message: `Book image data already exist, for this id ${req.body.book_id}` }
      }

      let fileUpload: any = []
      let files = req.files as Express.Multer.File[]
      let directory: string

      for (const i in files) {
        if (process.platform !== 'win32') {
          directory = `/tmp/${files[i][0]['originalname']}`
        } else {
          directory = `${process.env.TEMP}/${files[i][0]['originalname']}`
        }
        const result = await cloudinaryStorage(directory)
        fileUpload.push(result.secure_url)
      }

      if (fileUpload.length > 0) {
        const body: IBookImage = {
          book_id: req.body.book_id,
          first_image: fileUpload[0],
          second_image: fileUpload[1],
          third_image: fileUpload[2],
          fourth_image: fileUpload[3],
          fifth_image: fileUpload[4]
        }

        const addBookImage: ModelBookImage = await super.model().query().insert(body).first()

        if (!addBookImage) {
          throw { code: status.FORBIDDEN, message: 'Uploading new book image failed' }
        }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Uploading new book image success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method PUT
   * @description function for updated uploading file image for specific book id
   */

  public async updateServiceBookImage(req: Request<IBookImage>): Promise<Record<string, any>> {
    try {
      const checkBookImage: ModelBookImage = await this.model().query().findById(req.params.id)

      if (!checkBookImage) {
        throw { code: status.NOT_FOUND, message: `Book image data not found, for this id ${req.params.id}` }
      }

      const checkTableColumn: ModelBookImage[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn.length) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      let fileUpload: any = []
      let files = req.files as Express.Multer.File[]
      let directory: string

      for (const i in files) {
        if (process.platform !== 'win32') {
          directory = `/tmp/${files[i][0]['originalname']}`
        } else {
          directory = `${process.env.TEMP}/${files[i][0]['originalname']}`
        }
        const result = await cloudinaryStorage(directory)
        fileUpload.push(result.secure_url)
      }

      if (fileUpload.length > 0) {
        const body: IBookImage = {
          book_id: req.body.book_id,
          first_image: fileUpload[0],
          second_image: fileUpload[1],
          third_image: fileUpload[2],
          fourth_image: fileUpload[3],
          fifth_image: fileUpload[4]
        }

        const updateBookImage: ModelBookImage = await this.model().query().updateAndFetchById(req.params.id, body)

        if (!updateBookImage) {
          throw { code: status.FORBIDDEN, message: 'Updated book image data failed' }
        }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Updated book image data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
