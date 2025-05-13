import {createSlice} from '@reduxjs/toolkit';

const initalState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initalState,
  reducers: {
    setUserData: (state, action) => {
      const {Token, Data} = action.payload;
      state.user = Data;
      state.token = Token;
    },
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
});
export const {setUserData, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
