import { Map } from 'immutable'

export const INITIAL_STATE = Map()

export function unsubscribe (state, user) {
  return state.delete(action.user)
}

export function subscribe (state, user) {
  return state.set(action.user, 'Flow')
}

export function changeFeeling (state, user, feeling) {
  return state.set(action.user, action.feeling)
}
