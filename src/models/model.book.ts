import { Model, RelationMappings } from 'objection'
import { ModelAuthor } from './model.author'
import { DTOBook, DTOBookImage } from '../dto/dto.book'

export class ModelBook extends Model implements DTOBook {
  id!: number
  name!: string
  isbn!: number
  release_date!: any
  publisher!: string
  price!: number
  description?: string
  language!: string
  page!: number
  author_id!: number
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'book'
  }

  static get relationMappings(): RelationMappings {
    return {
      author: {
        relation: Model.HasOneRelation,
        modelClass: ModelAuthor,
        join: {
          from: `${this.tableName}.id`,
          to: `${ModelAuthor.tableName}.author_id`
        }
      }
    }
  }

  model(): typeof ModelBook {
    return ModelBook
  }

  $beforeInsert(): void {
    this.release_date = new Date(this.release_date)
    this.created_at = new Date()
  }

  $beforeUpdate() {
    this.release_date = new Date(this.release_date)
    this.updated_at = new Date()
  }
}

export class ModelBookImage extends Model implements DTOBookImage {
  id!: number
  book_id!: number
  first_image!: string
  second_image!: any
  third_image!: string
  fourth_image!: string
  fifth_image!: string
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'book_image'
  }

  static get relationMappings(): RelationMappings {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: ModelBook,
        join: {
          from: `${this.tableName}.book_id`,
          to: `${ModelBook.tableName}.id`
        }
      }
    }
  }

  model(): typeof ModelBookImage {
    return ModelBookImage
  }

  $beforeInsert(): void {
    this.created_at = new Date()
  }

  $beforeUpdate() {
    this.updated_at = new Date()
  }
}
