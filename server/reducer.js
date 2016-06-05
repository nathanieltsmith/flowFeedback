import { subscribe, unsubscribe, changeStatus, INITIAL_STATE } from './core'

export default function reducer (state = INITIAL_STATE, action) {
  console.log('REDUCING', action)
  switch (action.type) {
    case 'SUBSCRIBE':
      return subscribe(state, action.user)
    case 'UNSUBSCRIBE':
      return unsubscribe(state, action.user)
    case 'CHANGESTATUS':
      return changeStatus(state, action.user, action.feeling)
  }
  return state
}
