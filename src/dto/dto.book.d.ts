export interface DTOBook {
  id: number
  name: string
  isbn: number
  release_date: any
  publisher: string
  price: number
  description?: string
  language: string
  page: number
  author_id: number
  created_at?: any
  updated_at?: any
}

export interface DTOBookImage {
  id: number
  book_id: number
  first_image: string
  second_image: any
  third_image: string
  fourth_image: string
  fifth_image: string
  created_at?: any
  updated_at?: any
}
