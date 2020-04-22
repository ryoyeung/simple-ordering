import BaseException from './BaseException'

export default class BadRequestException extends BaseException {
  constructor (error: string) {
    super(error)
    this.status = 400
    this.name = 'BadRequestException'
    Reflect.setPrototypeOf(this, BadRequestException.prototype)
  }
}
