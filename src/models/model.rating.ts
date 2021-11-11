import { Model, RelationMappings, RelationMappingsThunk } from 'objection'
import { DTORating } from '@/dto/dto.rating'
import { ModelBook } from '@/models/model.book'
import { ModelUser } from '@/models/model.user'

export class ModelRating extends Model implements DTORating {
  id!: number
  rating!: string
  description?: string
  user_id!: number
  book_id!: number
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'rating'
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: ModelUser,
        join: {
          from: `${this.tableName}.user_id`,
          to: `${ModelUser.tableName}.id`
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

  model(): typeof ModelRating {
    return ModelRating
  }

  $beforeInsert(): void {
    this.created_at = new Date()
  }

  $beforeUpdate(): void {
    this.updated_at = new Date()
  }
}
