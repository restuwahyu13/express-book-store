import { Router } from 'express'
import { ControllerBook } from '../controllers/controller.book'

export class RouteBook extends ControllerBook {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  main(): Router {
    this.router.post('/', this.createControllerBook)
    this.router.get('/', this.resultsControllerBook)
    this.router.get('/:id', this.resultControllerBook)
    this.router.delete('/:id', this.deleteControllerBook)
    this.router.put('/:id', this.updateControllerBook)

    return this.router
  }
}
