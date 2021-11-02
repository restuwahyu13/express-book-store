import { StatusCodes as status } from 'http-status-codes'

import { ModelUser } from '../models/model.user'
import { IOrder, IServiceOrder } from '../interfaces/interface.order'
import { Request } from '../helpers/helper.generic'

export class ServiceOrder extends ModelUser implements IServiceOrder {
  async createServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  async resultsServiceOrder(): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  async resultServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  async deleteServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  async updateServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
