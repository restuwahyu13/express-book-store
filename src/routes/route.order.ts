import { Router } from 'express'
import { ControllerOrder } from '@controllers/controller.order'

export class RouteOrder extends ControllerOrder {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post('/', this.createControllerOrder)
    this.router.get('/', this.resultsControllerOrder)
    this.router.get('/:id', this.resultServiceOrder)
    this.router.delete('/:id', this.deleteControllerOrder)
    this.router.put('/:id', this.updateControllerOrder)

    return this.router
  }
}

export default new RouteOrder().main()
