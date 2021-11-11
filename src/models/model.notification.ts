import { Model } from 'objection'
import { DTONotification } from '@/dto/dto.notificaton'

export class ModelNotification extends Model implements DTONotification {
  id!: number
  user_id!: number
  book_id!: number
  order_item_id!: number
  message!: string
  token!: string
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'notification'
  }

  model(): typeof ModelNotification {
    return ModelNotification
  }

  $beforeInsert(): void {
    this.created_at = new Date()
  }

  $beforeUpdate(): void {
    this.updated_at = new Date()
  }
}
