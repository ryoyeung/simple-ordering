import { Status } from '../src/interface/Order'

export const validOrderPayload = {
  origin: ['22.322511', '114.257832'],
  destination: ['22.280687', '114.1576636']
}

export const invalidOriginPayload = {
  origin: [22.322511, '114.257832'],
  destination: ['22.280687', '114.1576636']
}

export const invalidDestinationPayload = {
  origin: ['22.322511', '114.257832'],
  destination: ['22.280687', 114.1576636]
}

export const sameAddressesOrder = {
  origin: ['22.322511', '114.257832'],
  destination: ['22.322511', '114.257832']
}

export const veryCloseAddressesOrder = {
  origin: ['22.322511', '114.257832'],
  destination: ['22.322511', '114.257831']
}

export const invalidTakeOrderPayload = {
  status: 'invalidStatus'
}

export const validTakeOrderPayload = {
  status: Status.TAKEN
}
