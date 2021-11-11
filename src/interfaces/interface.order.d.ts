import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerOrder {
  createControllerOrder(req: Request, res: Response): Promise<any>
  resultsControllerOrder(req: Request, res: Response): Promise<any>
  resultControllerOrder(req: Request, res: Response): Promise<any>
  deleteControllerOrder(req: Request, res: Response): Promise<any>
  updateControllerOrder(req: Request, res: Response): Promise<any>
}

export interface IServiceOrder {
  createServiceOrder(req: Request): Promise<Record<string, any>>
  resultsServiceOrder(): Promise<Record<string, any>>
  resultServiceOrder(req: Request): Promise<Record<string, any>>
  deleteServiceOrder(req: Request): Promise<Record<string, any>>
  updateServiceOrder(req: Request): Promise<Record<string, any>>
}

export type IOrder = {
  name: string
  address: string
  state: string
  city: string
  country: string
  postcode: number
  user_id: number
  created_at?: any
  updated_at?: any
}

export interface IControllerOrderItem {
  resultsControllerOrderItem(req: Request, res: Response): Promise<any>
  resultControllerOrderItem(req: Request, res: Response): Promise<any>
  deleteControllerOrderItem(req: Request, res: Response): Promise<any>
  updateControllerOrderItem(req: Request, res: Response): Promise<any>
}

export interface IServiceOrderItem {
  resultsServiceOrderItem(): Promise<Record<string, any>>
  resultServiceOrderItem(req: Request): Promise<Record<string, any>>
  deleteServiceOrderItem(req: Request): Promise<Record<string, any>>
  updateServiceOrderItem(req: Request): Promise<Record<string, any>>
}

export type IOrderItem = {
  order_id: number
  book_id: number
  order_status: string
  payment_type: string
  payment_status: string
  total_order: number
  created_at?: any
  updated_at?: any
}
