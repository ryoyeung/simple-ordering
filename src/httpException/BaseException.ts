export default class BaseException extends Error {
  public status: number

  constructor (error: string) {
    super(error)
  }
}
