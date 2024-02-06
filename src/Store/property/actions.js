import { createAction } from '@reduxjs/toolkit';

export const getProperties = createAction(`[PROPERTIES] GET_PROPERTIES`);
export const getPropertiesResponse = createAction(`[PROPERTIES] GET_PROPERTIES_RESPONSE`);

export const getPolicies = createAction(`[POLICIES] GET_POLICIES`);
export const getPoliciesResponse = createAction(`[POLICIES] GET_POLICIES_RESPONSE`);

export const updatePolicies = createAction(`[POLICIES] UPDATE_POLICIES`, (updatedPolicies) => ({
    payload: updatedPolicies
}));
export const updatePoliciesResponse = createAction(`[POLICIES] UPDATE_POLICIES_RESPONSE`);