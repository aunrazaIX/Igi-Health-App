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
  },
  claimLogde: {
    lodge: 'Claims/AddNewClaim',
    attachment: (userId: string, myuuid: string, ClientCode: string) =>
      `Attachment/upload?userId=${userId}&UUID=${myuuid}&ClientCode=${ClientCode}`,
  },
  claimHistory: {
    getAllClaim: 'Claims/getClaimsView',
  },
};

export default endpoints;
