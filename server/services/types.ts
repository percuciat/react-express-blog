export interface IResponse {
  status: 'Error' | 'OK',
  message: string,
  payload: any
}