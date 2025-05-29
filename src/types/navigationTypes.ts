export type RootStackParamList = {
  ForgotPassword: {
    step: number;
    type: 'signup' | 'forgot';
    verifiedUserData?: any;
  };
};
