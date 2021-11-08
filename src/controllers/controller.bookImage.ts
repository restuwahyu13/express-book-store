import { StatusCodes as status } from 'http-status-codes'

import { IBookImage, IControllerBookImage } from '@/interfaces/interface.book'
import { Request, Response } from '@/helpers/helper.generic'
import { ServiceBookImage } from '@/services/service.bookImage'
import { checkSchema } from 'express-validator'

export class ControllerBookImage extends ServiceBookImage implements IControllerBookImage {
  /**
   * @method POST
   * @description function for created uploading file image for specific book id
   */

  public async createControllerBookImage(req: Request<IBookImage>, res: Response): Promise<any> {
    try {
      const result = await super.createServiceBookImage(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  /**
   * @method PUT
   * @description function for updated uploading file image for specific book id
   */

  public async updateControllerBookImage(req: Request<IBookImage>, res: Response): Promise<any> {
    try {
      const result = await super.updateServiceBookImage(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }
}

/**
 * @description schema validator initialize for all property controller here
 */

export class Schema {
  static createSchemaBookImage = checkSchema({
    book_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'book_id is required'
      },
      isNumeric: {
        errorMessage: 'book_id must be number'
      }
    }
  })

  static updateSchemaBookImage = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'id is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    },
    book_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'book_id is required'
      },
      isNumeric: {
        errorMessage: 'book_id must be number'
      }
    }
  })
}
