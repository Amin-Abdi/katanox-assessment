import { configureStore } from '@reduxjs/toolkit'; // ...
import createSagaMiddleware from 'redux-saga';
import PropertyReducer from './property/reducer';
import PoliciesReducer from './property/policiesReducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: [sagaMiddleware],
  reducer: {
    property: PropertyReducer,
    policies: PoliciesReducer
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
