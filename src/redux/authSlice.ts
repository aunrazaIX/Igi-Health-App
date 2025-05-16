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
}

const initialState: AuthState = {
  user: null,
  token: null,
};

interface SetUserDataPayload {
  Token: string;
  Data: User;
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
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setUserData, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
