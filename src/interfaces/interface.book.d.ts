import { Request, Response } from '../helpers/helper.generic'

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
  readonly name: string
  readonly isbn: number
  readonly release_date: any
  readonly publisher: string
  readonly price: number
  readonly description?: string
  readonly language: string
  readonly page: number
  readonly author_id: number
  readonly created_at?: any
  readonly updated_at?: any
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
  readonly book_id: number
  readonly first_image: string
  readonly second_image: any
  readonly third_image: string
  readonly fourth_image: string
  readonly fifth_image: string
  readonly created_at?: any
  readonly updated_at?: any
}
