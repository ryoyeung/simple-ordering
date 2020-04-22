import { SuccessResponse } from './response'

export enum Status {
  TAKEN = 'TAKEN',
  UNASSIGNED = 'UNASSIGNED'
}

export interface OrderDTO {
  id: number
  distance: number
  status: Status
}

export interface TakeOrderResponse extends SuccessResponse {}
