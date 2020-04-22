import { EntityRepository, Repository } from 'typeorm'
import Order from '../entity/Order'

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  public async getPaginatedOrders (limit: number, offset: number): Promise<Order[]> {
    return this.createQueryBuilder('o')
      .take(limit)
      .skip(offset)
      .getMany()
  }
}
