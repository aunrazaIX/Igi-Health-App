import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  ClientCode: string;
  UserEmail: string;
  cnic: string;
  UserName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  rememberMe: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  rememberMe: false,
};

interface SetUserDataPayload {
  Token: string;
  Data: User;
  rememberMe: boolean;
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<SetUserDataPayload>) => {
      const {Token, Data} = action.payload;
      state.user = Data;
      state.token = Token;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.rememberMe = false;
    },
  },
});

export const {setUserData, logout, setRememberMe} = authSlice.actions;
export const authReducer = authSlice.reducer;
