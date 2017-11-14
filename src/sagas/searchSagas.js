import { put, call } from 'redux-saga/effects';
import { fetchTestWithExperimentsByTestKey } from '../api/searchApi';
import * as actionTypes from '../shared/actionTypes';

export function* searchRequestSaga({ query }) {
  console.log('handling search request sagas')

  // fetch tests
  let tests;
  try {
    tests = yield call(fetchTestWithExperimentsByTestKey, query);
  } catch (error) {
    yield put({ type: actionTypes.SEARCH_REQUEST_ERROR, error });
  }

  // update UI for search request success
  yield put({ type: actionTypes.SEARCH_REQUEST_SUCCESS, tests })

}
