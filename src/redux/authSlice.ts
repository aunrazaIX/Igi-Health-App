import {createSlice} from '@reduxjs/toolkit';

const initalState = {
  user: {
    userName: null,
    password: null,
  },
  token: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initalState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: state => {
      state.token = null;
      state.user.userName = null;
      state.user.password = null;
    },
  },
});
export const {setUser, setToken, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
