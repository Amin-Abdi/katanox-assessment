import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getProperties, getPolicies, updatePolicies } from './service';
import { getPropertiesResponse, getProperties as getPropertiesAction, 
  getPoliciesResponse, getPolicies as getPoliciesAction, updatePoliciesResponse ,updatePolicies as updatedPoliciesAction } from './actions';

function* getPropertiesEffect() {
    const properties = yield call(getProperties);
    yield put(getPropertiesResponse(properties));
  
  }
  function* getPoliciesEffect() {
    const policies = yield call(getPolicies);
    yield put(getPoliciesResponse(policies));
  }

  function* updatePoliciesEffect(action) {
    const updatedPolicies = yield call(updatePolicies, action.payload);
    yield put(updatePoliciesResponse(updatedPolicies));
  }

  function* watchGetProperties() {
    yield takeLatest(getPropertiesAction.type, getPropertiesEffect);
  }

  function* watchGetPolicies() {
    yield takeLatest(getPoliciesAction.type, getPoliciesEffect);
  }

  function* watchUpdatePolicies() {
    yield takeLatest(updatedPoliciesAction.type, updatePoliciesEffect);
  }

  export default function* propertySaga() {
    yield all([
      fork(watchGetProperties),
      fork(watchGetPolicies),
      fork(watchUpdatePolicies)
    ]);
  }
  