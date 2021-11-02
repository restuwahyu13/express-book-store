import { Model, RelationMappings } from 'objection'
import { DTOUser, DTOSecret } from '../dto/dto.user'
import { hashPassword } from '../libs/lib.bcrypt'

export class ModelUser extends Model implements DTOUser {
  id!: number
  email!: string
  password!: string
  role!: string
  active?: boolean
  verified?: boolean
  access_token?: string
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'user'
  }

  model(): typeof ModelUser {
    return ModelUser
  }

  async $beforeInsert(): Promise<void> {
    if (this.role == 'admin') {
      this.verified = true
      this.active = true
    }
    const password = await hashPassword(this.password)
    this.password = password
    this.created_at = new Date()
  }

  $beforeUpdate() {
    if (this.role == 'admin') {
      this.verified = true
      this.active = true
    }
    this.updated_at = new Date()
  }
}

export class ModelSecret extends Model implements DTOSecret {
  id!: number
  user_id!: number
  access_token!: string
  expired_at!: any
  type!: string
  created_at?: any
  updated_at?: any

  static get tableName(): string {
    return 'secret_key'
  }

  static get relationMappings(): RelationMappings {
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

  model(): typeof ModelSecret {
    return ModelSecret
  }
}
