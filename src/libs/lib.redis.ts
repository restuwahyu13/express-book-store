import IORedis from 'ioredis'

export class Redis {
  private db: number

  constructor(db: number) {
    this.db = db
  }

  private redis(): IORedis.Redis {
    return new IORedis({
      host: process.env.REDIS_HOST as string,
      port: parseInt(process.env.REDIS_PORT as any),
      enableAutoPipelining: true,
      enableOfflineQueue: true,
      connectTimeout: 15000,
      maxRetriesPerRequest: 40,
      db: this.db
    }) as IORedis.Redis
  }

  public async countCacheData(key: string): Promise<number> {
    const res = await this.redis().hgetall(key)
    return JSON.parse(res.payload).data.length
  }

  public async keyCacheDataExist(key: string): Promise<number> {
    const res = await this.redis().exists(key)
    return res
  }

  public async delCacheData(key: string): Promise<number> {
    const res = await this.redis().del(key)
    return res
  }

  public async setCacheData(key: string, data: Record<string, any>[]): Promise<number> {
    const res = this.redis().hset(key, { payload: JSON.stringify({ data }) })
    return res
  }

  public async getCacheData(key: string) {
    const res = await this.redis().hgetall(key)
    return JSON.parse(res.payload).data
  }
}
