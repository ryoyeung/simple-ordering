import dotenv from 'dotenv'
dotenv.config()
import { describe, it } from 'mocha'
import { expect } from 'chai'
import getDistanceMatrixMock from './getDistanceMatrixMock.json'
import GoogleMap from '../src/service/GoogleMap'
import { validOrderPayload } from './order.samples'


describe('Google map getDistanceMatrix API', () => {
  it('should return expected payload', (done) => {
    const googleMap = new GoogleMap()
    const { origin, destination } = validOrderPayload

    googleMap.getDistanceMatrix(origin, destination)
      .then((response) => {
        expect(response).to.deep.equal(getDistanceMatrixMock)
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})
