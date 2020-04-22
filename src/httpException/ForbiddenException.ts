import BaseException from './BaseException'

export default class ForbiddenException extends BaseException {
  constructor (error: string) {
    super(error)
    this.status = 403
    this.name = 'ForbiddenException'
    Reflect.setPrototypeOf(this, ForbiddenException.prototype)
  }
}
