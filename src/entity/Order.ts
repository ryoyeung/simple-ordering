import { Entity, PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm'
import { Status, OrderDTO } from '../interface/Order'

@Entity({ name: 'order' })
export default class Order {
  constructor () {
    this.setStatus(Status.UNASSIGNED)
  }

  @PrimaryGeneratedColumn({ name: 'order_id' })
  public id: number

  @Column('simple-json', { name: 'origin', nullable: false })
  public origin: string[]

  @Column('simple-json', { name: 'destination', nullable: false })
  public destination: string[]

  @Column({ name: 'distance', nullable: false })
  public distance: number

  @Column({ name: 'status', nullable: false })
  public status: Status

  @VersionColumn()
  version: number

  public getId (): number {
    return this.id
  }

  public getOrigin (): string[] {
    return this.origin
  }

  public setOrigin (origin: string[]): void {
    this.origin = origin
  }

  public getDestination (): string[] {
    return this.destination
  }

  public setDestination (destination: string[]): void {
    this.destination = destination
  }

  public getDistance (): number {
    return this.distance
  }

  public setDistance (distance: number): void {
    this.distance = distance
  }

  public getStatus (): Status {
    return this.status
  }

  public setStatus (status: Status): void {
    this.status = status
  }

  public toDTO (): OrderDTO {
    return {
      id: this.getId(),
      distance: this.getDistance(),
      status: this.getStatus()
    }
  }
}
