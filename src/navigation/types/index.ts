export type DrawerStackParamList = {
  Home: {
    screen: keyof HomeStackParamList;
  };
  ClaimsHistory: undefined;
  FAQs: undefined;
  Hospitals: undefined;
  SettingsStack: undefined;
  Tabs: {
    screen: keyof TabStackParamList;
  };
};

export type HomeStackParamList = {
  Benefits: undefined;
  Personal: undefined;
  Hospitals: undefined;
  PanelHospitalList: undefined;
  Notifications: undefined;
  ForgotPassword: undefined;
};

export type TabStackParamList = {
  HomeStack: undefined;
  LodgeClaim: undefined;
  PriorApproval: undefined;
  Helpline: undefined;
};

export type MainStackParamList = {
  AuthStack: undefined;
  DrawerStack: undefined;
};
