const endpoints = {
  auth: {
    login: 'Account/Login',
    registerUser: 'Account/RegisterUser',
    sendOtp: 'Account/getOTPforpasswordChanged',
    verifyOTP: (otp, email) => `Account/Verify-Otp?OTP=${otp}&Email=${email}`,
    resendOTP: (email) => `Account/Resend-Otp?Email=${email}`,
    setPassword: 'Account/SetPassword',
    createPassword: (email, newPassword) => `Account/SetPassword?Email=${email}&NewPassword=${newPassword}`,
  },
  Benefits: {
    getBenefits: 'Benefit/GetUserBenefits',
  },
  dependent: {
    getDependents: (cnic, clientCode,policyType) => `ClaimProcess/GetCustomerDependent?Cnic=${cnic}&ClientCode=${clientCode}&PolicyType=${policyType}`, 
    addDependentRequest: 'Dependent/',
  },
  claimHistory: {
    getAllClaim: 'ClaimProcess/GetAllClaims',
  },
  bank: {
    getBankDetails: 'Bank/GetBankDetails',
  },
  treatments: {
    getTypes: 'ClaimsType/getOPDType',
    getIPDTypes: 'ClaimsType/getIPDType',
    getMATTypes: 'ClaimsType/getMaternityType',
    IPDTypesForPriorApproval: 'PriorApprovals/GetIPDTreatmentTypes',
  },
  claimLogde: {
    lodge: 'Claims/AddNewClaim',
    attachment: (userId, myuuid, ClientCode) =>
      `Attachment/upload?userId=${userId}&UUID=${myuuid}&ClientCode=${ClientCode}`,
  },
  panelHospital: {
    getPanelHospitals: 'PanelHospital/GetActivePanelHospitals',
  },
  discountedCenters: {
    getDiscountedCenters: 'DiscountCenters/GetActiveDiscCenter',
  },
  policy: {
    getPolicyTypes: 'Policy/GetPolicyTypes',
    getPolicyDetails: 'Policy/GetPolicyDetails',
    getMaternity: 'Policy/GetPolicyDetailsMAT',
  },
  coverage: {
    getCoverage: 'Policy/GetPolicyCoverage',
  },
  priorApproval: {
    addPriorApproval: 'PriorApprovals/AddPriorApproval',
    attachment: (userId, myuuid, ClientCode) =>
      `PriorApprovals/upload?userId=${userId}&UUID=${myuuid}&ClientCode=${ClientCode}`,
  },
  notifications: {
    getAll: 'PushNotification/getNotifications',
    markAsRead: 'PushNotification/readNotification',
  },
  PriorApprovalHistory: {
    getPriorApprovalRequests: 'PriorApprovals/GetPriorApprovalRequests',
  },
};

export default endpoints;
