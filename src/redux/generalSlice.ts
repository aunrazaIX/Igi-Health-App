import {createSlice} from '@reduxjs/toolkit';

const initalState = {
  showErrorModal: false,
  errorMessage: null,
  errorDetail: null,
  isIntroSlider: true,
};
export const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: initalState,
  reducers: {
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
  },
});
export const {setErrorModal, setIntroSlider} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
