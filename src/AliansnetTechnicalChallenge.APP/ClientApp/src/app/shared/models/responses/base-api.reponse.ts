export interface BaseAPIResponse<T>{
  message: string
  data : T,
  errors : string[]
}
