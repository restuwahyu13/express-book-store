export interface DTOBook {
  readonly id: number
  readonly name: string
  readonly isbn: number
  readonly release_date: any
  readonly publisher: string
  readonly price: number
  readonly description?: string
  readonly author_id: number
  readonly created_at?: any
  readonly updated_at?: any
}

export interface DTOBookImage {
  readonly id: number
  readonly book_id: number
  readonly first_image: string
  readonly second_image: any
  readonly third_image: string
  readonly fourth_image: string
  readonly fifth_image: string
  readonly created_at?: any
  readonly updated_at?: any
}
