import { IsArray, IsString, ArrayMinSize, ArrayMaxSize, IsNumberString, Equals, Min, IsOptional, IsNumber } from 'class-validator'
import { Status } from './Order'
import { Type } from 'class-transformer'

export class BaseValidationClass {}

export interface PlaceOrderParams {
  origin: string[]
  destination: string[]
}

export class ValidatePlaceOrderParams extends BaseValidationClass {
  constructor (params: PlaceOrderParams) {
    super()
    this.origin = params.origin
    this.destination = params.destination
  }

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  origin: string[]

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  destination: string[]
}

export interface TakeOrderParams {
  id: number
  status: Status.TAKEN
}

export class ValidateTakeOrderParams extends BaseValidationClass {
  constructor (params: TakeOrderParams) {
    super()
    this.id = params.id
    this.status = params.status
  }

  @IsNumberString()
  id: number

  @Equals(Status.TAKEN)
  status: Status.TAKEN
}

export interface OrderListParams {
  page: number
  limit: number
}

export class ValidateOrderListParams extends BaseValidationClass {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  limit: number
}
