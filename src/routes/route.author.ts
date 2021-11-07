import { Router } from 'express'
import { ControllerAuthor, Schema } from '../controllers/controller.author'
import { validator } from '../libs/lib.validator'

export class RouteAuthor extends ControllerAuthor {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/', [...Schema.createSchemaAuthor, validator()], this.createControllerAuthor)
    this.router.get('/', this.resultsControllerAuthor)
    this.router.get('/:id', [...Schema.resultSchemaAuthor, validator()], this.resultControllerAuthor)
    this.router.delete('/:id', [...Schema.deleteSchemaAuthor, validator()], this.deleteControllerAuthor)
    this.router.put('/:id', [...Schema.updateSchemaAuthor, validator()], this.updateControllerAuthor)

    return this.router
  }
}
