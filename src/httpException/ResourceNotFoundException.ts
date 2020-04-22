import BaseException from './BaseException'

export default class ResourceNotFoundException extends BaseException {
  constructor (error: string) {
    super(error)
    this.status = 404
    this.name = 'ResourceNotFoundException'
    Reflect.setPrototypeOf(this, ResourceNotFoundException.prototype)
  }
}
