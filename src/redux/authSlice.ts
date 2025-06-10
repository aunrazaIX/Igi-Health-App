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
  };
  deviceId: null | string;
  biometrics: {
    userName: string | number | null;
    password: any;
    DeviceId: any;
    LoginDeviceName: any;
  };
}

const initialState: AuthState = {
  user: null,
  token: null,
  rememberMe: false,
  credentials: {
    userName: '',
    password: '',
  },
  deviceId: null,
  biometrics: {
    userName: null,
    password: null,
    DeviceId: null,
    LoginDeviceName: null,
  },
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
    setRememberMe: (
      state,
      action: PayloadAction<{
        userName: string;
        password: string;
        rememberMe: boolean;
      }>,
    ) => {
      const {userName, rememberMe, password} = action.payload;
      state.credentials = {
        userName,
        password,
      };
      state.rememberMe = rememberMe;
    },
    logout: state => {
      // state.user = null;
      state.token = null;
    },
    setBiometrics: (state, {payload}) => {
      state.biometrics = {
        ...state.biometrics,
        ...payload,
      };
    },
  },
});

export const {setUserData, logout, setRememberMe, setBiometrics} =
  authSlice.actions;
export const authReducer = authSlice.reducer;
