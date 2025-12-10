import {createSlice} from '@reduxjs/toolkit';

const initalState = {
  showErrorModal: false,
  errorMessage: null,
  errorDetail: null,
  isIntroSlider: true,
  policyClass: null,
  selectedPolicy: null,
  selectedPolicyObject: null,
};
export const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: initalState,
  reducers: {
    setPolicy: (state, action) => {
      state.selectedPolicy = action.payload;
    },
    setSelectedPolicyObject: (state, action) => {
      state.selectedPolicyObject = action.payload;
    },
    setErrorModal: (state, {payload}) => {
      state.showErrorModal = payload?.show;
      if (payload?.message !== undefined) {
        state.errorMessage = payload.message;
      }
      if (payload?.detail !== undefined) {
        state.errorDetail = payload.detail;
      }
    },
    setIntroSlider: (state, {payload}) => {
      state.isIntroSlider = payload;
    },
    setPolicyClass: (state, {payload}) => {
      state.policyClass = payload;
    },
  },
});
export const {
  setSelectedPolicyObject,
  setPolicy,
  setErrorModal,
  setIntroSlider,
  setPolicyClass,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
