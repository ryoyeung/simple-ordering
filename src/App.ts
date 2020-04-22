import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import express from 'express'
import { Request, Response } from 'express'
import Routes from './route/Routes'
import BaseException from './httpException/BaseException'
import InternalServerException from './httpException/InternalServerException'
import { SuccessJson, ResponseJson, FailureJson } from './interface/response'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import cors = require('cors')
import { Server } from 'http'

export default class App {
  public app: express.Application

  constructor() {
    this.setApp(express())
    this.createConnection()
    this.initializeMiddlewares()
    this.initializeController()
    this.getApp().all('*', (request, response) => {
      this.jsonError(response, `${request.originalUrl} not found.`, 404)
    })
  }

  private getApp(): express.Application {
      return this.app
  }

  private setApp(app: express.Application): void {
      this.app = app
  }

  private async createConnection(): Promise<Connection> {
    return await createConnection()
  }

  private initializeMiddlewares (): void {
    this.getApp().use(helmet())
    this.getApp().use(cors())
    this.getApp().use(bodyParser.json())
    this.getApp().use(bodyParser.urlencoded({ extended: false }))
  }

  private initializeController (): void {
    Routes.forEach(route => {
      (this.getApp() as any)[route.method](route.route, (request: Request, response: Response) => {
        return (new (route.controller as any)(request))[route.action]()
          .then(result => {
            return this.jsonSuccess(response, result)
          })
          .catch(error => {
            let err: any

            if (error instanceof BaseException) {
              err = <BaseException> error
            } else {
              if (process.env.NODE_ENV = 'development') {
                console.log(error)
              }
              
              err = new InternalServerException('Internal server error. Please contact system administrator.')
            }

            return this.jsonError(response, err.message, err.status) 
        })
      })
    })
  }

  public listen (): Server {
    return this.getApp().listen(3000)
  }

  private json (response: Response, data: ResponseJson, status: number) {
    return response.status(status).json(data)
  }

  private async jsonSuccess (response: Response, data: any) {
    return this.json(response, <SuccessJson> data, 200)
  }

  private jsonError (response: Response, error: string, status = 400) {
    return this.json(response, <FailureJson> { error: error }, status)
  }
  
}