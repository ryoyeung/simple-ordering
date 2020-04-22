export interface GetDistanceMatrixResponse {
  status: TopLevelStatus
  destination_addresses: string[]
  origin_addresses: string[]
  rows: Row[]
}

interface Row {
  elements: Element[]
}

interface Element {
  status: ElementLevelStatus
  duration: Duration
  distance: Distance
}

export enum TopLevelStatus {
  OK = 'OK',
  INVALID_REQUEST = 'INVALID_REQUEST',
  MAX_ELEMENTS_EXCEEDED = 'MAX_ELEMENTS_EXCEEDED',
  OVER_DAILY_LIMIT = 'OVER_DAILY_LIMIT',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export enum ElementLevelStatus {
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  ZERO_RESULTS = 'ZERO_RESULTS',
  MAX_ROUTE_LENGTH_EXCEEDED = 'MAX_ROUTE_LENGTH_EXCEEDED'
}

interface Duration {
  text: string
  value: number
}

interface Distance {
  text: string
  value: number
}

export enum TravelMode {
  DRIVING = 'driving',
  WALKING = 'walking',
  BICYCLING = 'bicycling',
  TRANSIT = 'transit'
}

export enum Unit {
  METRIC = 'metric',
  IMPERIAL = 'imperial'
}
