import { takeLatest } from 'redux-saga';
import { searchRequestSaga } from './searchSagas';
import * as actionTypes from '../shared/actionTypes';

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export default function* startForman() {
  yield [
    takeLatest(actionTypes.SEARCH_REQUEST, searchRequestSaga)
  ]
}
