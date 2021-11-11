import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerNotification {
  createControllerRating(req: Request, res: Response): Promise<any>
  resultsControllerRating(req: Request, res: Response): Promise<any>
  resultControllerRating(req: Request, res: Response): Promise<any>
  deleteControllerRating(req: Request, res: Response): Promise<any>
  updateControllerRating(req: Request, res: Response): Promise<any>
}

export interface IServiceNotification {
  createServiceRating(req: Request): Promise<Record<string, any>>
  resultsServiceRating(): Promise<Record<string, any>>
  resultServiceRating(req: Request): Promise<Record<string, any>>
  deleteServiceRating(req: Request): Promise<Record<string, any>>
  updateServiceRating(req: Request): Promise<Record<string, any>>
}

export type INotification = {
  id: number
  user_id: number
  book_id: number
  order_item_id: number
  message: string
  token: string
  created_at?: any
  updated_at?: any
}
