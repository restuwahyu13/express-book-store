import { Request, Response } from '../helpers/helper.generic'

interface IControllerOrder {
  createControllerOrder(req: Request, res: Response): Promise<any>
  resultsControllerOrder(req: Request, res: Response): Promise<any>
  resultControllerOrder(req: Request, res: Response): Promise<any>
  deleteControllerOrder(req: Request, res: Response): Promise<any>
  updateControllerOrder(req: Request, res: Response): Promise<any>
}

interface IServiceOrder {
  createServiceOrder(req: Request): Promise<Record<string, any>>
  resultsServiceOrder(): Promise<Record<string, any>>
  resultServiceOrder(req: Request): Promise<Record<string, any>>
  deleteServiceOrder(req: Request): Promise<Record<string, any>>
  updateServiceOrder(req: Request): Promise<Record<string, any>>
}

export type IOrder = {
  readonly name: string
  readonly address: string
  readonly state: string
  readonly city: string
  readonly country: string
  readonly postcode: number
  readonly user_id: number
  readonly created_at?: any
  readonly updated_at?: any
}

interface IControllerOrderItem {
  resultsControllerOrderItem(req: Request, res: Response): Promise<any>
  resultControllerOrderItem(req: Request, res: Response): Promise<any>
  deleteControllerOrderItem(req: Request, res: Response): Promise<any>
  updateControllerOrderItem(req: Request, res: Response): Promise<any>
}

interface IServiceOrderItem {
  resultsServiceOrderItem(): Promise<Record<string, any>>
  resultServiceOrderItem(req: Request): Promise<Record<string, any>>
  deleteServiceOrderItem(req: Request): Promise<Record<string, any>>
  updateServiceOrderItem(req: Request): Promise<Record<string, any>>
}

export type IOrderItem = {
  readonly order_id: number
  readonly book_id: number
  readonly order_status: string
  readonly payment_type: string
  readonly payment_status: string
  readonly total_order: number
  readonly created_at?: any
  readonly updated_at?: any
}
