export interface DTOUser {
  id: number
  email: string
  password: string
  role: string
  active?: boolean
  verified?: boolean
  access_token?: string
  created_at?: any
  updated_at?: any
}

export interface DTOSecret {
  id: number
  user_id: number
  access_token: string
  expired_at: any
  type: string
  created_at?: any
  updated_at?: any
}
