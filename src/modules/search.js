import * as ActionTypes from "../shared/ActionTypes"

// ------------------------------------
// Actions
// ------------------------------------
export function performSearch(query = "") {
  console.log("sending action: ActionTypes.SEARCH_REQUEST");
  return {
    type: ActionTypes.SEARCH_REQUEST,
    query: query
  }
}

export const actions = {
  performSearch
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const handleSearchRequest = (state, action) => {
  console.log("Search request init")
  return {
    ...state,
    query: action.query
  }
}

const handleSearchRequestSuccess = (state, action) => {
  console.log("Search request success")
  return {
    ...state,
    tests: action.tests
  }
}

const handleSearchRequestError = (state, action) => {
  console.log("Search request error, setting state to empty")
  return {
    ...state,
    tests: []
  }
}

const ACTION_HANDLERS = {
  [ActionTypes.SEARCH_REQUEST]: handleSearchRequest,
  [ActionTypes.SEARCH_REQUEST_SUCCESS]: handleSearchRequestSuccess,
  [ActionTypes.SEARCH_REQUEST_ERROR]: handleSearchRequestError
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  query: "",
  tests: []
}

export default function searchReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
