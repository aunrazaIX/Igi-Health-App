import { createSlice } from '@reduxjs/toolkit';
import { clampRGBA } from 'react-native-reanimated/lib/typescript/Colors';

const initalState = {
  user: {
    userName: null,
    password: null
  },

  token: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initalState,
  reducers: {

    setUser: (state, action) => {
      console.log("my action" , action.payload)
      
      state.user = action.payload;
    },

    setToken: (state, action) => {
      console.log("my user" , action.payload)
      state.token = action.payload;

    },
    
  },
});
export const { setUser, setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
