import { describe, it } from 'mocha'
import chai from 'chai'
import server from '../src/index'
import { validOrderPayload, sameAddressesOrder, veryCloseAddressesOrder, invalidOriginPayload, invalidDestinationPayload, invalidTakeOrderPayload, validTakeOrderPayload } from './order.samples'
import { OrderDTO, Status, TakeOrderResponse } from '../src/interface/Order'
import { FailureJson } from '../src/interface/response'
import chaiHttp = require('chai-http')

chai.use(chaiHttp)
const should = chai.should()
const expect = chai.expect
let placedOrderId = null

describe('Random endpoint', () => {
  it('should return 404 on a random endpoint', (done) => {
    chai.request(server)
      .get('/randomEndpoint')
      .end((err, res) => {
        res.should.have.status(404)
        const failureJson: FailureJson = res.body
        expect(failureJson.error).to.be.a('string')
        done()
      })
  })
})

describe('Order', () => {
  describe('Place order', () => {
    it('should place a order', (done) => {
      chai.request(server)
        .post('/orders')
        .send(validOrderPayload)
        .end((err, res) => {
          res.should.have.status(200)
          const order: OrderDTO = res.body
          expect(order.id).to.be.a('number')
          expect(order.distance).to.be.a('number')
          expect(order.status).to.equal(Status.UNASSIGNED)
          placedOrderId = order.id
          done()
        })
    })

    it('should not place a order with invalid origin', (done) => {
      chai.request(server)
        .post('/orders')
        .send(invalidOriginPayload)
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should not place a order with invalid destination', (done) => {
      chai.request(server)
        .post('/orders')
        .send(invalidDestinationPayload)
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should not place a order with same origin and destination', (done) => {
      chai.request(server)
        .post('/orders')
        .send(sameAddressesOrder)
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should not place a order with very close origin and destination', (done) => {
      chai.request(server)
        .post('/orders')
        .send(veryCloseAddressesOrder)
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })
  })

  describe('Take order', () => {
    it('should not take an order with invalid id', (done) => {
      chai.request(server)
        .patch('/orders/randomOrderId')
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should not take a non-exist order ', (done) => {
      chai.request(server)
        .patch('/orders/9999999999')
        .send(validTakeOrderPayload)
        .end((err, res) => {
          res.should.have.status(404)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should not take an order with invalid status', (done) => {
      chai.request(server)
        .patch(`/orders/${placedOrderId}`)
        .send(invalidTakeOrderPayload)
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should take an order', (done) => {
      chai.request(server)
        .patch(`/orders/${placedOrderId}`)
        .send(validTakeOrderPayload)
        .end((err, res) => {
          res.should.have.status(200)
          const response: TakeOrderResponse = res.body
          expect(response.status).to.equal('SUCCESS')
          done()
        })
    })

    it('should not take a taken order', (done) => {
      chai.request(server)
        .patch(`/orders/${placedOrderId}`)
        .send(validTakeOrderPayload)
        .end((err, res) => {
          res.should.have.status(403)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })
  })

  describe('Order list', () => {
    it('should return 400 with invalid page', (done) => {
      chai.request(server)
        .get('/orders?page=randomPage&limit=10')
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should return 400 when page is 0', (done) => {
      chai.request(server)
        .get('/orders?page=0&limit=10')
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should return 400 with invalid limit', (done) => {
      chai.request(server)
        .get('/orders?page=1&limit=randomLimit')
        .end((err, res) => {
          res.should.have.status(400)
          const failureJson: FailureJson = res.body
          expect(failureJson.error).to.be.a('string')
          done()
        })
    })

    it('should return empty array with a big page number', (done) => {
      chai.request(server)
        .get('/orders?page=1000000000&limit=10')
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).to.be.an('array').that.is.empty
          done()
        })
    })

    it('should return order list', (done) => {
      chai.request(server)
        .get('/orders?page=1&limit=10')
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).to.be.an('array').that.is.not.empty
          done()
        })
    })
  })
})
