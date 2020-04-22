export interface SuccessJson {}

export interface FailureJson {
  error: string
}

export type ResponseJson = SuccessJson | FailureJson

export interface SuccessResponse {
  status: 'SUCCESS'
}
