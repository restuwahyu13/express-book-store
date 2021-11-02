export interface DTOUser {
  readonly id: number
  readonly email: string
  readonly password: string
  readonly role: string
  readonly active?: boolean
  readonly verified?: boolean
  readonly access_token?: string
  readonly created_at?: any
  readonly updated_at?: any
}

export interface DTOSecret {
  readonly id: number
  readonly user_id: number
  readonly access_token: string
  readonly expired_at: any
  readonly type: string
  readonly created_at?: any
  readonly updated_at?: any
}
