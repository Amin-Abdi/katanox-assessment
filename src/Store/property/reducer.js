import { createReducer } from '@reduxjs/toolkit';
import {
  getPropertiesResponse,
} from './actions';


const initState = {
  properties: [],
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(getPropertiesResponse, (state, action) => {
      state.properties = action.payload;
    })
});

export default reducer;
