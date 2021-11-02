import 'dotenv/config'
import path from 'path'

export const development: Record<string, any> = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 1,
    max: 5
  },
  migrations: {
    directory: path.resolve(process.cwd(), 'src/databases/migrations/')
  },
  seeds: {
    directory: path.resolve('src/databases/seeds/')
  },
  log: {
    error: (msg: string | any): void => console.error(msg),
    warn: (msg: string | any): void => console.error(msg)
  }
}

export const staging: Record<string, any> = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 1,
    max: 5
  },
  migrations: {
    directory: path.resolve(process.cwd(), 'src/databases/migrations/')
  },
  seeds: {
    directory: path.resolve('src/databases/seeds/')
  },
  log: {
    error: (msg: string | any): void => console.error(msg),
    warn: (msg: string | any): void => console.error(msg)
  }
}

export const production: Record<string, any> = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: {
    min: 1,
    max: 5
  },
  migrations: {
    directory: path.resolve(process.cwd(), 'src/databases/migrations/')
  },
  seeds: {
    directory: path.resolve('src/databases/seeds/')
  },
  log: {
    error: (msg: string | any): void => console.error(msg),
    warn: (msg: string | any): void => console.error(msg)
  }
}
