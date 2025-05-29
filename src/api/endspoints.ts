const endpoints = {
  auth: {
    login: 'Login/Login',
    registerUser: 'VerifyUser/UserVerification',
    sendOtp: 'OTP/getOTPforpasswordChanged',
    verifyOTP: 'OTP/VerifyOTP',
    updatePassword: 'Password/changePassword',
  },
  bank: {
    getBankDetails: 'Bank/GetBankDetails',
  },
  dependants: {
    getDependants: 'UserRelation/GetOPD',
  },
  treatments: {
    getTypes: 'ClaimsType/getOPDType',
    getIPDTypes: 'ClaimsType/getIPDType',
    getMATTypes: 'ClaimsType/getMATType',
  },
  claimLogde: {
    lodge: 'Claims/AddNewClaim',
    attachment: (userId: string, myuuid: string, ClientCode: string) =>
      `Attachment/upload?userId=${userId}&UUID=${myuuid}&ClientCode=${ClientCode}`,
  },
  claimHistory: {
    getAllClaim: 'Claims/getClaimsView',
  },
  panelHospital: {
    getPanelHospitals: 'PanelHospital/GetActivePanelHospitals',
  },
  discountedCenters: {
    getDiscountedCenters: 'DiscountCenters/GetActiveDiscCenter',
  },
  dependent: {
    getDependentType: 'Dependent/getAllDependentType',
    getDependetRequestTypes: 'Dependent/getDependentRequestTypes',
    addDependentRequest: 'Dependent/addDependentRequest',
    getDependentList: 'UserRelation/GetOPD',
  },
  policy: {
    getPolicyTypes: 'Policy/GetPolicyTypes',
    getPolicyDetails: 'Policy/GetPolicyDetails',
  },
};

export default endpoints;
