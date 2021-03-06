import { Router } from 'express'

import { ControllerBookImage } from '@controllers/controller.bookImage'
import { upload } from '@libs/lib.multer'

export class RouteBookImage extends ControllerBookImage {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  public main(): Router {
    this.router.post(
      '/',
      [
        upload.fields([
          { name: 'first_image' },
          { name: 'second_image' },
          { name: 'third_image' },
          { name: 'fourth_image' },
          { name: 'fifth_image' }
        ])
      ],
      this.createControllerBookImage
    )

    this.router.put(
      '/:id',
      [
        upload.fields([
          { name: 'first_image' },
          { name: 'second_image' },
          { name: 'third_image' },
          { name: 'fourth_image' },
          { name: 'fifth_image' }
        ])
      ],
      this.updateControllerBookImage
    )

    return this.router
  }
}

export default new RouteBookImage().main()
