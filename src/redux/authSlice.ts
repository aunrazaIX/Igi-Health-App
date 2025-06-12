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
  credentials: {
    userName: string;
    password: string;
    rememberMe: boolean;
  } | null;
  deviceId: string | null;
  biometrics: {
    userName: string;
    password: string;
    deviceId: string;
    LoginDeviceName: string;
  } | null;

  faceIdCredentials: {
    userName: string;
    password: string;
    deviceId: string;
    LoginDeviceName: string;
  } | null;

  isToggle: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  rememberMe: false,
  credentials: null,
  deviceId: null,
  biometrics: null,
  faceIdCredentials: null,
  isToggle: false,
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
    setRememberMe: (state, action: PayloadAction<AuthState['credentials']>) => {
      state.credentials = action.payload;
      state.rememberMe = action.payload?.rememberMe || false;
    },
    logout: state => {
      state.user = null;
      state.token = null;
    },
    setBiometrics: (state, action: PayloadAction<AuthState['biometrics']>) => {
      state.biometrics = action.payload;
    },
    setFaceIdCredentials: (
      state,
      action: PayloadAction<AuthState['faceIdCredentials']>,
    ) => {
      state.faceIdCredentials = action.payload;
    },
    SetIsToggle: (state, {payload}) => {
      state.isToggle = payload;
    },
  },
});

export const {
  setUserData,
  logout,
  setRememberMe,
  setBiometrics,
  setFaceIdCredentials,
  SetIsToggle,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
