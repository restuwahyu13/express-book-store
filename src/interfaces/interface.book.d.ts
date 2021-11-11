import { Request, Response } from '@/helpers/helper.generic'

export interface IControllerBook {
  createControllerBook(req: Request, res: Response): Promise<any>
  resultsControllerBook(req: Request, res: Response): Promise<any>
  resultControllerBook(req: Request, res: Response): Promise<any>
  deleteControllerBook(req: Request, res: Response): Promise<any>
  updateControllerBook(req: Request, res: Response): Promise<any>
}

export interface IServiceBook {
  createServiceBook(req: Request): Promise<Record<string, any>>
  resultsServiceBook(): Promise<Record<string, any>>
  resultServiceBook(req: Request): Promise<Record<string, any>>
  deleteServiceBook(req: Request): Promise<Record<string, any>>
  updateServiceBook(req: Request): Promise<Record<string, any>>
}

export type IBook = {
  name: string
  isbn: number
  release_date: any
  publisher: string
  price: number
  description?: string
  language: string
  page: number
  author_id: number
  created_at?: any
  updated_at?: any
}

export interface IControllerBookImage {
  createControllerBookImage(req: Request, res: Response): Promise<any>
  // resultsControllerBookImage(req: Request, res: Response): Promise<any>
  // resultControllerBookImage(req: Request, res: Response): Promise<any>
  updateControllerBookImage(req: Request, res: Response): Promise<any>
}

export interface IServiceBookImage {
  createServiceBookImage(req: Request): Promise<Record<string, any>>
  // resultsServiceBookImage(): Promise<Record<string, any>>
  // resultServiceBookImage(req: Request): Promise<Record<string, any>>
  // deleteServiceBookImage(req: Request): Promise<Record<string, any>>
  updateServiceBookImage(req: Request): Promise<Record<string, any>>
}

export type IBookImage = {
  book_id: number
  first_image: string
  second_image: any
  third_image: string
  fourth_image: string
  fifth_image: string
  created_at?: any
  updated_at?: any
}
