import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerRating {
  createControllerRating(req: Request, res: Response): Promise<any>
  resultsControllerRating(req: Request, res: Response): Promise<any>
  resultControllerRating(req: Request, res: Response): Promise<any>
  deleteControllerRating(req: Request, res: Response): Promise<any>
  updateControllerRating(req: Request, res: Response): Promise<any>
}

export interface IServiceRating {
  createServiceRating(req: Request): Promise<Record<string, any>>
  resultsServiceRating(): Promise<Record<string, any>>
  resultServiceRating(req: Request): Promise<Record<string, any>>
  deleteServiceRating(req: Request): Promise<Record<string, any>>
  updateServiceRating(req: Request): Promise<Record<string, any>>
}

export type IRating = {
  id: number
  rating: string
  description?: string
  user_id: number
  book_id: number
  created_at?: any
  updated_at?: any
}
