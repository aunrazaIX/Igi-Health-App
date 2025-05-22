import { createSlice } from '@reduxjs/toolkit';

const initalState = {
  showErrorModal: false,
  errorMessage: null,
};
export const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: initalState,
  reducers: {
    setErrorModal: (state, { payload }) => {
      state.showErrorModal = payload?.show;

      if (payload?.message) {
        state.errorMessage = payload.message;
      }
    },
  },
});
export const { setErrorModal } = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
