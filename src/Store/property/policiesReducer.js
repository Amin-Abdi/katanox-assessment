import { createReducer } from '@reduxjs/toolkit';
import {
  getPoliciesResponse,
} from './actions';


const initState = {
  policies: [],
};

const policiesReducer = createReducer(initState, (builder) => {
    builder
      .addCase(getPoliciesResponse, (state, action) => {
        state.policies = action.payload;
      })
  
});

export default policiesReducer;
