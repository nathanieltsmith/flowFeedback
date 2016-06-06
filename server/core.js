import { Map } from 'immutable'

export const INITIAL_STATE = Map()

export function unsubscribe (state, user) {
  return state.delete(user)
}

export function subscribe (state, user) {
  return state.set(user, 'Flow')
}

export function changeFeeling (state, user, feeling) {
  return state.set(user, feeling)
}
