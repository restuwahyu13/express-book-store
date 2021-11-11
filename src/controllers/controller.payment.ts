import { StatusCodes as status } from 'http-status-codes'
import { checkSchema } from 'express-validator'
import { IOrder, IControllerOrder } from '@interfaces/interface.order'
import { Request, Response } from '@helpers/helper.generic'
import { ServiceOrder } from '@services/service.order'

export class ControllerOrder extends ServiceOrder implements IControllerOrder {
  async createControllerOrder(req: Request<IOrder>, res: Response): Promise<any> {
    try {
      const result = await super.createServiceOrder(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultsControllerOrder(req: Request<IOrder>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultsServiceOrder()
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async resultControllerOrder(req: Request<IOrder>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.resultServiceOrder(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async deleteControllerOrder(req: Request<IOrder>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.deleteServiceOrder(req)
      if (result.code >= status.BAD_REQUEST) {
        throw { ...result }
      }
      res.status(result.code).json(result)
    } catch (e: any) {
      res.status(e.code || status.BAD_REQUEST).json({ ...e })
    }
  }

  async updateControllerOrder(req: Request<IOrder>, res: Response): Promise<any> {
    try {
      const result: Record<string, any> = await super.updateServiceOrder(req)
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
  static loginSchemaRegister = checkSchema({
    email: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'password is required'
      },
      isEmail: {
        errorMessage: 'email is not valid'
      }
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'password is required'
      }
    }
  })
}
