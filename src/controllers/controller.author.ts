import { StatusCodes as status } from 'http-status-codes'
import { checkSchema } from 'express-validator'

import { IAuthor, IControllerAuthor } from '@/interfaces/interface.author'
import { ServiceAuthor } from '@/services/service.author'
import { Request, Response } from '@/helpers/helper.generic'

export class ControllerAuthor extends ServiceAuthor implements IControllerAuthor {
  /**
   * @method POST
   * @description function for created new author
   */

  public async createControllerAuthor(req: Request<IAuthor>, res: Response): Promise<any> {
    try {
      const result = await super.createServiceAuthor(req)
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
   * @description function for get all authors
   */

  public async resultsControllerAuthor(req: Request<IAuthor>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultsServiceAuthor()
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
   * @description function for get author by specific id
   */

  public async resultControllerAuthor(req: Request<IAuthor>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultServiceAuthor(req)
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
   * @description function for deleted author by specific id
   */

  public async deleteControllerAuthor(req: Request<IAuthor>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.deleteServiceAuthor(req)
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
   * @description function for updated author by specific id
   */

  public async updateControllerAuthor(req: Request<IAuthor>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.updateServiceAuthor(req)
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
      },
      custom: {
        options: (value) => /[^A-Z]/gi.test(value) === false,
        errorMessage: 'first_name not including number or unique character'
      }
    },
    last_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_name is required'
      },
      isString: {
        errorMessage: 'last_name must be string'
      },
      custom: {
        options: (value) => /[^A-Z]/gi.test(value) === false,
        errorMessage: 'last_name not including number or unique character'
      }
    },
    place_of_birth: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'place_of_birth is required'
      },
      isString: {
        errorMessage: 'place_of_birth must be string'
      },
      custom: {
        options: (value) => /[^A-Z]/gi.test(value) === false,
        errorMessage: 'place_of_birth not including number or unique character'
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
      },
      custom: {
        options: (value) => /[^A-Z]/gi.test(value) === false,
        errorMessage: 'first_name not including number or unique character'
      }
    },
    last_name: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'last_name is required'
      },
      isString: {
        errorMessage: 'last_name must be string'
      },
      custom: {
        options: (value) => /[^A-Z]/gi.test(value) === false,
        errorMessage: 'last_name not including number or unique character'
      }
    },
    place_of_birth: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'place_of_birth is required'
      },
      isString: {
        errorMessage: 'place_of_birth must be string'
      },
      custom: {
        options: (value) => /[^A-Z]/gi.test(value) === false,
        errorMessage: 'place_of_birth not including number or unique character'
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
