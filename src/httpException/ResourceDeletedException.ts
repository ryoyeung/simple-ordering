import BaseException from './BaseException'

export default class ResourceDeletedException extends BaseException {
  constructor (error: string) {
    super(error)
    this.status = 404
    this.name = 'ResourceDeletedException'
    Reflect.setPrototypeOf(this, ResourceDeletedException.prototype)
  }
}
