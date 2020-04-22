import BaseException from './BaseException'

export default class InternalServerException extends BaseException {
  constructor (error: string) {
    super(error)
    this.status = 500
    this.name = 'InternalServerException'
    Reflect.setPrototypeOf(this, InternalServerException.prototype)
  }
}
