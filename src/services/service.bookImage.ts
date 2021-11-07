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

  async createServiceBookImage(req: Request<IBookImage>): Promise<Record<string, any>> {
    try {
      const checkBookImage: ModelBookImage = await super.model().query().where({ book_id: req.body.book_id }).first()

      if (checkBookImage) {
        throw { code: status.CONFLICT, message: `Book image data already exist, for this id ${req.body.book_id}` }
      }

      let fileUpload: any
      let files = req.files as Express.Multer.File[]

      for (const i in files) {
        const result = await cloudinaryStorage(files[i][0]['originalname'])
        fileUpload.push(result.url)
      }

      const body: IBookImage = {
        book_id: req.body.book_id,
        first_image: fileUpload[0],
        second_image: fileUpload[0],
        third_image: fileUpload[0],
        fourth_image: fileUpload[0],
        fifth_image: fileUpload[0]
      }

      const addBookImage: ModelBookImage = await super.model().query().insert(body).first()

      if (!addBookImage) {
        throw { code: status.FORBIDDEN, message: 'Created new book image failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Created new book image success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  /**
   * @method PUT
   * @description function for update uploading file image for specific book id
   */

  async updateServiceBookImage(req: Request<IBookImage>): Promise<Record<string, any>> {
    try {
      const checkBookImage: ModelBookImage = await this.model().query().findById(req.params.id)

      if (!checkBookImage) {
        throw { code: status.NOT_FOUND, message: `Book image data not found, for this id ${req.params.id}` }
      }

      const checkTableColumn: ModelBookImage[] = await super.model().query().column(Object.keys(req.body))

      if (!checkTableColumn.length) {
        throw { code: status.BAD_REQUEST, message: 'Column table miss match' }
      }

      let fileUpload: any
      let files = req.files as Express.Multer.File[]

      for (const i in files) {
        const result = await cloudinaryStorage(files[i][0]['originalname'])
        fileUpload.push(result.url)
      }

      const body: IBookImage = {
        book_id: req.body.book_id,
        first_image: fileUpload[0],
        second_image: fileUpload[0],
        third_image: fileUpload[0],
        fourth_image: fileUpload[0],
        fifth_image: fileUpload[0]
      }

      const updateBookImage: ModelBookImage = await this.model().query().updateAndFetchById(req.params.id, body)

      if (!updateBookImage) {
        throw { code: status.FORBIDDEN, message: 'Updated book image data failed' }
      }

      return Promise.resolve({ code: status.CREATED, message: 'Updated book image data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
