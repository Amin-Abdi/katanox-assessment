import { fork } from 'redux-saga/effects';
import propertySaga from './property/saga';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* rootSaga(): Generator<any, any, any> {
  yield fork(propertySaga);
}
