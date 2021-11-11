export interface DTOOrder {
  id: number
  name: string
  email: string
  phone: number
  address: string
  state: string
  city: string
  country: string
  postcode: number
  user_id: number
  created_at?: any
  updated_at?: any
}

export interface DTOOrderItem {
  id: number
  order_id: number
  book_id: number
  order_status: string
  payment_type: string
  payment_status: string
  total_order: number
  created_at?: any
  updated_at?: any
}
