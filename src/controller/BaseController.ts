import { Request } from 'express'
import { validate } from 'class-validator'
import BadRequestException from '../httpException/BadRequestException'
import ResourceNotFoundException from '../httpException/ResourceNotFoundException'
import ResourceDeletedException from '../httpException/ResourceDeletedException'
import InternalServerException from '../httpException/InternalServerException'
import { getManager } from 'typeorm'
import ForbiddenException from '../httpException/ForbiddenException'

export default class BaseController {
  private request: Request

  constructor (req: Request) {
    this.setRequest(req)
  }

  public getRequest (): Request {
    return this.request
  }

  public setRequest (request: Request): void {
    this.request = request
  }

  protected getRequestParams <T> (): T {
    const request = this.getRequest()
    return { ...request.params, ...request.query, ...request.body }
  }

  protected async validateParams (validationClass: any) {
    const errors = await validate(validationClass)

    if (errors.length > 0) {
      const errorMessages: string[] = []
      errors.forEach(error => {
        Object.values(error.constraints).map(value => errorMessages.push(value))
      })
      this.throwBadRequestExceptionUnless(false, errorMessages.join(' | '))
    }
  }

  protected save <T> (entity: T): Promise<T> {
    return getManager().save <T>(entity)
  }

  /* ----- HTTP Exception Handling ----- */
  protected throwBadRequestExceptionUnless (condition: boolean, error: string): void {
    if (!condition) {
      throw new BadRequestException(error)
    }
  }

  protected throwForbiddenExceptionUnless (condition: boolean, error: string): void {
    if (!condition) {
      throw new ForbiddenException(error)
    }
  }

  protected throwResourceNotFoundExceptionUnless (condition: boolean, error: string): void {
    if (!condition) {
      throw new ResourceNotFoundException(error)
    }
  }

  protected throwResourceDeletedExceptionUnless (condition: boolean, error: string): void {
    if (!condition) {
      throw new ResourceDeletedException(error)
    }
  }

  protected throwInternalServerExceptionUnless (condition: boolean, error: string): void {
    if (!condition) {
      throw new InternalServerException(error)
    }
  }
}
