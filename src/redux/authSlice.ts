import {createSlice} from '@reduxjs/toolkit';

const initalState = {
  user: {
    
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
  },
});
export const {setUser, setToken} = authSlice.actions;
export const authReducer = authSlice.reducer;
