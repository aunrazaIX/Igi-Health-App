import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  rememberMe: false,
  credentials: null,
  deviceId: null,
  biometrics: null,
  faceIdCredentials: null,
  isToggle: false,
  deviceToken: null,
  widgetToken: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const {Token, Data} = action.payload;
      state.user = Data;
      state.token = Token;
    },
    setRememberMe: (state, action) => {
      state.credentials = action.payload;
      state.rememberMe = action.payload?.rememberMe || false;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.widgetToken = null;
    },
    setBiometrics: (state, action) => {
      state.biometrics = action.payload;
    },
    setFaceIdCredentials: (state, action) => {
      state.faceIdCredentials = action.payload;
    },
    SetIsToggle: (state, {payload}) => {
      state.isToggle = payload;
    },
    setDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
    setWidgetToken: (state, action) => {
      state.widgetToken = action.payload;
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
  setDeviceToken,
  setWidgetToken,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
