import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getProperties } from './service';
import { getPropertiesResponse, getProperties as getPropertiesAction } from './actions';

function* getPropertiesEffect() {
    const properties = yield call(getProperties);
    yield put(getPropertiesResponse(properties));
  
  }

  function* watchGetProperties() {
    yield takeLatest(getPropertiesAction.type, getPropertiesEffect);
  }
  export default function* propertySaga() {
    yield all([
      fork(watchGetProperties),
    ]);
  }
  