import { Model, RelationMappings } from 'objection'
import { DTOOrder, DTOOrderItem } from '../dto/dto.order'
import { ModelBook } from './model.book'
import { ModelUser } from './model.user'

export class ModelOrder extends Model implements DTOOrder {
  id!: number
  name!: string
  address!: string
  state!: string
  city!: string
  country!: string
  postcode!: number
  user_id!: number
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'order'
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: ModelUser,
        join: {
          from: `${this.tableName}.user_id`,
          to: `${ModelUser.tableName}.id`
        }
      }
    }
  }

  model(): typeof ModelOrder {
    return ModelOrder
  }

  $beforeInsert(): void {
    this.created_at = new Date()
  }

  $beforeUpdate() {
    this.updated_at = new Date()
  }
}

export class ModelOrderItem extends Model implements DTOOrderItem {
  id!: number
  order_id!: number
  book_id!: number
  order_status!: string
  payment_type!: string
  payment_status!: string
  total_order!: number
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'order_item'
  }

  static get relationMappings(): RelationMappings {
    return {
      order: {
        relation: Model.HasOneRelation,
        modelClass: ModelOrder,
        join: {
          from: `${this.tableName}.order_id`,
          to: `${ModelOrder.tableName}.id`
        }
      },
      book: {
        relation: Model.HasOneRelation,
        modelClass: ModelBook,
        join: {
          from: `${this.tableName}.book_id`,
          to: `${ModelBook.tableName}.id`
        }
      }
    }
  }

  model(): typeof ModelOrderItem {
    return ModelOrderItem
  }

  $beforeInsert(): void {
    this.created_at = new Date()
  }

  $beforeUpdate() {
    this.updated_at = new Date()
  }
}
