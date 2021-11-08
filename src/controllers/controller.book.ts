import { StatusCodes as status } from 'http-status-codes'

import { IBook, IControllerBook } from '@/interfaces/interface.book'
import { ServiceBook } from '@/services/service.book'
import { Request, Response } from '@/helpers/helper.generic'
import { checkSchema } from 'express-validator'

export class ControllerBook extends ServiceBook implements IControllerBook {
  /**
   * @method POST
   * @description function for add new book data
   */

  public async createControllerBook(req: Request<IBook>, res: Response): Promise<any> {
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

  /**
   * @method GET
   * @description function for get all book data
   */

  public async resultsControllerBook(req: Request<IBook>, res: Response): Promise<any> {
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

  /**
   * @method GET
   * @description function for get book data by specific id
   */

  public async resultControllerBook(req: Request<IBook>, res: Response): Promise<any> {
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

  /**
   * @method DELETE
   * @description function for delete book data by sepecific id
   */

  public async deleteControllerBook(req: Request<IBook>, res: Response): Promise<any> {
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

  /**
   * @method PUT
   * @description function for update book data by specific book id
   */

  public async updateControllerBook(req: Request<IBook>, res: Response): Promise<any> {
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
  static createSchemaBook = checkSchema({
    name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'name is required'
      },
      isString: {
        errorMessage: 'name must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'name not including unique character'
      }
    },
    isbn: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'isbn is required'
      },
      isNumeric: {
        errorMessage: 'isbn must be number'
      },
      isLength: {
        options: {
          min: 12,
          max: 12
        },
        errorMessage: 'isbn must be 12 character'
      }
    },
    release_date: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'release_date is required'
      },
      isDate: {
        errorMessage: 'release_date must be date'
      }
    },
    publisher: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'publisher is required'
      },
      isString: {
        errorMessage: 'publisher must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'publisher not including unique character'
      }
    },
    price: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'price is required'
      },
      isNumeric: {
        errorMessage: 'price must be numeric'
      }
    },
    description: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'description must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'publisher not including unique character'
      }
    },
    language: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'language is required'
      },
      isString: {
        errorMessage: 'language must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'language not including unique character'
      }
    },
    page: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'page is required'
      },
      isNumeric: {
        errorMessage: 'page must be number'
      }
    },
    author_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'author_id is required'
      },
      isNumeric: {
        errorMessage: 'author_id must be number'
      }
    }
  })

  static resultSchemaBook = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'id is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    }
  })

  static deleteSchemaBook = checkSchema({
    id: {
      in: ['params']
    },
    notEmpty: {
      errorMessage: 'id is required'
    },
    isNumeric: {
      errorMessage: 'id must be number'
    }
  })

  static updateSchemaBook = checkSchema({
    id: {
      in: ['params'],
      notEmpty: {
        errorMessage: 'id is required'
      },
      isNumeric: {
        errorMessage: 'id must be number'
      }
    },
    name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'name is required'
      },
      isString: {
        errorMessage: 'name must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'name not including number or unique character'
      }
    },
    isbn: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'isbn is required'
      },
      isNumeric: {
        errorMessage: 'isbn must be number'
      },
      isLength: {
        options: {
          min: 12,
          max: 12
        },
        errorMessage: 'isbn must be 12 character'
      }
    },
    release_date: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'release_date is required'
      },
      isDate: {
        errorMessage: 'release_date must be date'
      }
    },
    publisher: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'publisher is required'
      },
      isString: {
        errorMessage: 'publisher must be date'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'name not including publisher or unique character'
      }
    },
    price: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'price is required'
      },
      isNumeric: {
        errorMessage: 'price must be numeric'
      }
    },
    description: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'description must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'publisher not including number or unique character'
      }
    },
    language: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'language is required'
      },
      isString: {
        errorMessage: 'language must be string'
      },
      custom: {
        options: (value) => /^[A-z-Z-a]/gi.test(value),
        errorMessage: 'language not including number or unique character'
      }
    },
    page: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'page is required'
      },
      isNumeric: {
        errorMessage: 'page must be number'
      }
    },
    author_id: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'author_id is required'
      },
      isNumeric: {
        errorMessage: 'author_id must be number'
      }
    }
  })
}
