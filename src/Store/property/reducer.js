import { createReducer } from '@reduxjs/toolkit';
import {
  getPropertiesResponse,updatePoliciesResponse
} from './actions';


const initState = {
  properties: [],
  policies: {
    noShowPolicies: [],
    cancellationPolicies: []
  }
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(getPropertiesResponse, (state, action) => {
      state.properties = action.payload;
    })
    .addCase(updatePoliciesResponse, (state, action) => {
      state.policies = action.payload;
    });
});

export default reducer;
