export interface IControllerAdmin {
  createdControllerAdmin(req: Request, res: Response): Promise<any>
  resultsControllerAdmin(req: Request, res: Response): Promise<any>
  resultControllerAdmin(req: Request, res: Response): Promise<any>
  deleteControllerAdmin(req: Request, res: Response): Promise<any>
  updateControllerAdmin(req: Request, res: Response): Promise<any>
}

export interface IServiceAdmin {
  createdControllerAdmin(req: Request): Promise<Record<string, any>>
  resultsControllerAdmin(): Promise<Record<string, any>>
  resultControllerAdmin(req: Request): Promise<Record<string, any>>
  deleteControllerAdmin(req: Request): Promise<Record<string, any>>
  updateControllerAdmin(req: Request): Promise<Record<string, any>>
}

export type IAdmin = {
  readonly email: string
  readonly password: string
  readonly role: string
  readonly access_token?: string
  readonly created_at?: any
  readonly updated_at?: any
}
