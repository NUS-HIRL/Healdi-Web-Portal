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

// TODO: Change to fit SQL usage instead of noSQL
export interface PaginatedResponse<T> {
  data: T[]
  totalCount: number
  page: number
  totalPages: number
}
