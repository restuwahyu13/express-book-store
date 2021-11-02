import { Model } from 'objection'
import { DTOAuthor } from '../dto/dto.author'

export class ModelAuthor extends Model implements DTOAuthor {
  id!: number
  first_name!: string
  last_name!: string
  place_of_birth!: string
  date_of_birth!: any
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'author'
  }

  model(): typeof ModelAuthor {
    return ModelAuthor
  }

  $beforeInsert(): void {
    this.date_of_birth = new Date(this.date_of_birth)
    this.created_at = new Date()
  }

  $beforeUpdate() {
    this.date_of_birth = new Date(this.date_of_birth)
    this.updated_at = new Date()
  }
}
