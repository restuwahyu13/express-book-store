import { Router } from 'express'
import { ControllerBook, Schema } from '@/controllers/controller.book'
import { validator } from '@/libs/lib.validator'

export class RouteBook extends ControllerBook {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/', [...Schema.createSchemaBook, validator()], this.createControllerBook)
    this.router.get('/', this.resultsControllerBook)
    this.router.get('/:id', [...Schema.resultSchemaBook, validator()], this.resultControllerBook)
    this.router.delete('/:id', [...Schema.deleteSchemaBook, validator()], this.deleteControllerBook)
    this.router.put('/:id', [...Schema.updateSchemaBook, validator()], this.updateControllerBook)

    return this.router
  }
}
