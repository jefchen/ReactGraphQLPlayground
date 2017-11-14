import { combineReducers } from 'redux'
import searchReducer from '../modules/search.js'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    search: searchReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
