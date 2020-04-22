import OrderController from '../controller/OrderController'
import Route from '../interface/route'

const OrderRoute: Array<Route> = [
  {
    method: 'post',
    route: '/orders',
    controller: OrderController,
    action: 'placeOrder'
  }, {
    method: 'patch',
    route: '/orders/:id',
    controller: OrderController,
    action: 'takeOrder'
  }, {
    method: 'get',
    route: '/orders',
    controller: OrderController,
    action: 'orderList'
  }
]

export default OrderRoute
