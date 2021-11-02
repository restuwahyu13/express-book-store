import { StatusCodes as status } from 'http-status-codes'

import { IBook, IControllerBook } from '../interfaces/interface.book'
import { ServiceBook } from '../services/service.book'
import { Request, Response } from '../helpers/helper.generic'
import { checkSchema } from 'express-validator'

export class ControllerBook extends ServiceBook implements IControllerBook {
  async createControllerBook(req: Request<IBook>, res: Response): Promise<any> {
    try {
      const result = await super.createServiceBook(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultsControllerBook(req: Request<IBook>, res: Response): Promise<any> {
    try {
      const result = await super.resultsServiceBook()
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultControllerBook(req: Request<IBook>, res: Response): Promise<any> {
    try {
      const result = await super.resultServiceBook(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async deleteControllerBook(req: Request<IBook>, res: Response): Promise<any> {
    try {
      const result = await super.deleteServiceBook(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async updateControllerBook(req: Request<IBook>, res: Response): Promise<any> {
    try {
      const result = await super.updateServiceBook(req)
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
  static createSchemaAuthor = checkSchema({
    first_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'first_name is required'
      },
      isString: {
        errorMessage: 'first_name must be string'
      }
    },
    last_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_name is required'
      },
      isString: {
        errorMessage: 'last_name must be string'
      }
    },
    place_of_birth: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'place_of_birth is required'
      },
      isString: {
        errorMessage: 'place_of_birth must be string'
      }
    },
    date_of_birth: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'date_of_birth is required'
      },
      isDate: {
        errorMessage: 'date_of_birth must be date'
      }
    }
  })

  static resultSchemaAuthor = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'date_of_birth is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    }
  })

  static deleteSchemaAuthor = checkSchema({
    id: {
      in: ['params']
    },
    notEmpty: {
      errorMessage: 'date_of_birth is required'
    },
    isNumeric: {
      errorMessage: 'id must be number'
    }
  })

  static updateSchemaAuthor = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'date_of_birth is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    },
    first_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'first_name is required'
      },
      isString: {
        errorMessage: 'first_name must be string'
      }
    },
    last_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_name is required'
      },
      isString: {
        errorMessage: 'last_name must be string'
      }
    },
    place_of_birth: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'place_of_birth is required'
      },
      isString: {
        errorMessage: 'place_of_birth must be string'
      }
    },
    date_of_birth: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'date_of_birth is required'
      },
      isDate: {
        errorMessage: 'date_of_birth must be date'
      }
    }
  })
}
