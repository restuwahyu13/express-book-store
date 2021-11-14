import { Model, RelationMappings, RelationMappingsThunk } from 'objection'
import { DTOProfile } from '@dto/dto.profile'
import { ModelUser } from '@models/model.user'

export class ModelProfile extends Model implements DTOProfile {
  id!: number
  user_id!: number
  firstname!: string
  lastname!: string
  email!: string
  phone!: number
  place_of_birth!: string
  date_of_birth!: any
  address!: string
  state!: string
  city!: string
  country!: string
  postcode!: number
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'profile'
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
      }
    }
  }

  model(): typeof ModelProfile {
    return ModelProfile
  }

  $beforeInsert(): void {
    this.created_at = new Date()
  }

  $beforeUpdate(): void {
    this.updated_at = new Date()
  }
}
