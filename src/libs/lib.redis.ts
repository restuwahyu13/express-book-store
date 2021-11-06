import IORedis from 'ioredis'

export class Redis {
  private ioredis: IORedis.Redis

  constructor(db: number) {
    this.ioredis = new IORedis({
      host: process.env.REDIS_HOST as string,
      port: parseInt(process.env.REDIS_PORT as any),
      enableAutoPipelining: true,
      enableOfflineQueue: true,
      connectTimeout: 15000,
      maxRetriesPerRequest: 40,
      db: db
    }) as IORedis.Redis
  }

  public async countCacheData(key: string): Promise<number> {
    const res = await this.ioredis.hgetall(key)
    return JSON.parse(res.payload).data.length
  }

  public async keyCacheDataExist(key: string): Promise<number> {
    const res = await this.ioredis.exists(key)
    return res
  }

  public async delCacheData(key: string): Promise<number> {
    const res = await this.ioredis.del(key)
    return res
  }

  public async setCacheData(key: string, data: Record<string, any>[]): Promise<number> {
    const res = this.ioredis.hset(key, { payload: JSON.stringify({ data }) })
    return res
  }

  public async getCacheData(key: string) {
    const res = await this.ioredis.hgetall(key)
    return JSON.parse(res.payload).data
  }
}
