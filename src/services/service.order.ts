import { StatusCodes as status } from 'http-status-codes'

import { ModelOrder } from '@/models/model.order'
import { IOrder, IServiceOrder } from '@/interfaces/interface.order'
import { Request } from '@/helpers/helper.generic'

export class ServiceOrder extends ModelOrder implements IServiceOrder {
  public async createServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async resultsServiceOrder(): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async resultServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async deleteServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }

  public async updateServiceOrder(req: Request<IOrder>): Promise<Record<string, any>> {
    try {
      return Promise.resolve({ code: status.CREATED, message: 'Updated book data success' })
    } catch (e: any) {
      return Promise.reject({ code: e.code, message: e.message })
    }
  }
}
