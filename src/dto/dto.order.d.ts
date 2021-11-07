export interface DTOOrder {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly phone: number
  readonly address: string
  readonly state: string
  readonly city: string
  readonly country: string
  readonly postcode: number
  readonly user_id: number
  readonly created_at?: any
  readonly updated_at?: any
}

export interface DTOOrderItem {
  readonly id: number
  readonly order_id: number
  readonly book_id: number
  readonly order_status: string
  readonly payment_type: string
  readonly payment_status: string
  readonly total_order: number
  readonly created_at?: any
  readonly updated_at?: any
}
