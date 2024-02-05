import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getProperties, getPolicies } from './service';
import { getPropertiesResponse, getProperties as getPropertiesAction, 
  getPoliciesResponse, getPolicies as getPoliciesAction } from './actions';

function* getPropertiesEffect() {
    const properties = yield call(getProperties);
    yield put(getPropertiesResponse(properties));
  
  }
  function* getPoliciesEffect() {
    const policies = yield call(getPolicies);
    yield put(getPoliciesResponse(policies));
  }

  function* watchGetProperties() {
    yield takeLatest(getPropertiesAction.type, getPropertiesEffect);
  }

  function* watchGetPolicies() {
    yield takeLatest(getPoliciesAction.type, getPoliciesEffect);
  }

  export default function* propertySaga() {
    yield all([
      fork(watchGetProperties),
      fork(watchGetPolicies),
    ]);
  }
  