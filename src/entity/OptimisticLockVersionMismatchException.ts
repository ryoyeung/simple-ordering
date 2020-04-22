export default class OptimisticLockVersionMismatchException extends Error {
  name = 'OptimisticLockVersionMismatchError'

  constructor (entity: string, expectedVersion: number, actualVersion: number) {
    super(`The optimistic lock on entity ${entity} failed, version ${expectedVersion} was expected, but is actually ${actualVersion}.`)
    this.name = 'OptimisticLockVersionMismatchException'
    Object.setPrototypeOf(this, OptimisticLockVersionMismatchException.prototype)
  }
}
