import BaseController from './BaseController'
import { PlaceOrderParams, ValidatePlaceOrderParams, TakeOrderParams, ValidateTakeOrderParams, OrderListParams, ValidateOrderListParams } from '../interface/validation'
import Order from '../entity/Order'
import { OrderDTO, TakeOrderResponse, Status } from '../interface/Order'
import { TopLevelStatus, ElementLevelStatus, GetDistanceMatrixResponse } from '../interface/GoogleMap'
import { getManager } from 'typeorm'
import OptimisticLockVersionMismatchException from '../entity/OptimisticLockVersionMismatchException'
import OrderRepository from '../repository/Order'
import { plainToClassFromExist } from 'class-transformer'
import * as _ from 'lodash'
import GoogleMap from '../service/GoogleMap'

export default class OrderController extends BaseController {
  async placeOrder (): Promise<OrderDTO> {
    const params = this.getRequestParams <PlaceOrderParams>()
    await this.validateParams(new ValidatePlaceOrderParams(params))

    const { origin, destination } = params
    this.throwBadRequestExceptionUnless(!_.isEqual(origin, destination), 'Origin and destination should not be the same.')

    const order = new Order()
    let googleMapResponse: GetDistanceMatrixResponse = null

    try {
      const googleMap = new GoogleMap()
      googleMapResponse = await googleMap.getDistanceMatrix(origin, destination)
    } catch (error) {
      this.throwInternalServerExceptionUnless(false, 'Error when getting distance from Google Map service.')
    }

    this.throwBadRequestExceptionUnless(googleMapResponse.status === TopLevelStatus.OK, `Google Map service returned "${googleMapResponse.status}" as top-level status.`)
    this.throwBadRequestExceptionUnless(!!googleMapResponse.origin_addresses[0] && !!googleMapResponse.destination_addresses[0], 'Either origin or destination is not a valid address.')

    const element = googleMapResponse.rows[0].elements[0]
    this.throwBadRequestExceptionUnless(element.status === ElementLevelStatus.OK, `Google Map service returned "${element.status}" as element-level status.`)

    const distance = element.distance.value
    this.throwBadRequestExceptionUnless(distance > 0, 'Origin and destination are too closed.')

    order.setOrigin(origin)
    order.setDestination(destination)
    order.setDistance(distance)
    await this.save <Order>(order)

    return order.toDTO()
  }

  async takeOrder (): Promise<TakeOrderResponse> {
    const params = this.getRequestParams <TakeOrderParams>()
    await this.validateParams(new ValidateTakeOrderParams(params))

    const { id, status } = params
    const order = await getManager().findOne <Order>(Order, id)
    this.throwResourceNotFoundExceptionUnless(!!order, `Order (id: ${id}) not found.`)
    this.throwForbiddenExceptionUnless(order.getStatus() === Status.UNASSIGNED, `Order (id: ${id}) has been taken.`)

    order.setStatus(status)

    try {
      await this.save <Order>(order)
    } catch (error) {
      if (error instanceof OptimisticLockVersionMismatchException) {
        this.throwForbiddenExceptionUnless(false, `Order (id: ${id}) has been taken.`)
      }
    }

    return {
      status: 'SUCCESS'
    }
  }

  async orderList (): Promise<OrderDTO[]> {
    const params = this.getRequestParams <OrderListParams>()
    await this.validateParams(plainToClassFromExist(new ValidateOrderListParams(), params))

    const { page, limit } = params
    const offset = (page - 1) * limit
    const orders = await getManager().getCustomRepository(OrderRepository).getPaginatedOrders(limit, offset)

    return await Promise.all(orders.map(async order => {
      return order.toDTO()
    }))
  }
}
