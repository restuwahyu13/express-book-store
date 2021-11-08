import 'dotenv/config'
import express, { Express, Router } from 'express'
import http, { Server } from 'http'
import os from 'os'
import throng from 'throng'
import Knex from 'knex'
import Objection from 'objection'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import zlib from 'zlib'
import rateLimit from 'express-rate-limit'
import SlowDown from 'express-slow-down'

import * as knexfile from '@/knexfile'
import { RouteAuthor } from '@routes/route.author'
import { RouteBook } from '@routes/route.book'
import { RouteOrder } from '@routes/route.order'
import { RouteUser } from '@routes/route.user'
import { RouteBookImage } from '@routes/route.bookImage'

class App {
  private app: Express
  private server: Server
  private author: Router
  private book: Router
  private bookImage: Router
  private order: Router
  private user: Router

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.author = new RouteAuthor().main()
    this.book = new RouteBook().main()
    this.bookImage = new RouteBookImage().main()
    this.order = new RouteOrder().main()
    this.user = new RouteUser().main()
  }

  private async connection(): Promise<void> {
    const knex: any = Knex(knexfile[process.env.NODE_ENV as string])
    Objection.Model.knex(knex)
  }

  private async middleware(): Promise<void> {
    this.app.use(bodyParser.json({ limit: '5mb' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION,
        chunkSize: Infinity,
        threshold: Infinity
      })
    )
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3, // next request to endpoint
        max: 100, // maximal request for all endpoint
        message: 'To many request, send back request after 3 minutes'
      })
    )
    this.app.use(
      SlowDown({
        windowMs: 24 * 60 * 1, // next request to endpoint
        delayMs: 24 * 60 * 2000, // increment delay
        delayAfter: 100 // slow down after request
      })
    )
    if (process.env.NODE_ENV !== 'production') {
      this.app.use(morgan('dev'))
    }
  }

  private async config(): Promise<void> {
    this.app.disabled('x-powered-by')
  }

  private async route(): Promise<void> {
    this.app.use('/api/v1/author', this.author)
    this.app.use('/api/v1/book', this.book)
    this.app.use('/api/v1/book/upload', this.bookImage)
    this.app.use('/api/v1/order', this.order)
    this.app.use('/api/v1/user', this.user)
  }

  private async run(): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      this.server.listen(process.env.PORT, () => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Server is running on port: ', process.env.PORT)
        }
      })
    } else {
      throng({
        worker: (): void => {
          this.server.listen(process.env.PORT, () => {
            if (process.env.NODE_ENV !== 'production') {
              console.log('Server is running on port: ', process.env.PORT)
            }
          })
        },
        count: os.cpus().length,
        workers: os.cpus().length,
        lifetime: Infinity
      })
    }
  }

  public async main(): Promise<void> {
    await this.connection()
    await this.middleware()
    await this.config()
    await this.route()
    await this.run()
  }
}

/**
 * @description intialize app and run app
 */

;(async function () {
  await new App().main()
})()
