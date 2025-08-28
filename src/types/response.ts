export type SuccessResponse<T> = {
  status: number
  message: string
  data: T
}

export type ErrorResponse = {
  status: number
  message: string
  data: null
}

export interface PaginationKeys {
  next_page_key: string | null;
  previous_page_key: string | null;
}
export interface PaginatedResponse<T> {
  data: T[]
  count: number
  pagination: PaginationKeys
}
