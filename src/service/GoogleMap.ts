import axios from 'axios'
import { GetDistanceMatrixResponse, Unit, TravelMode } from '../interface/GoogleMap'
import Config from '../config/Config'

export default class GoogleMap {
  public async getDistanceMatrix (origin: string[], destination: string[], unit: Unit = Unit.METRIC, mode: TravelMode = TravelMode.DRIVING): Promise<GetDistanceMatrixResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get<GetDistanceMatrixResponse>(`${Config.GOOGLE_MAP_API_ENDPOINT}?units=${unit}&origins=${origin.join(',')}&destinations=${destination.join(',')}&mode=${mode}&key=${process.env.GOOGLE_MAP_API_KEY}`)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}
