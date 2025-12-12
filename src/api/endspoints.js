const endpoints = {
  auth: {
    login: 'Account/Login',
    registerUser: 'Account/RegisterUser',
    sendOtp: 'Account/getOTPforpasswordChanged',
    verifyOTP: (otp, email) => `Account/Verify-Otp?OTP=${otp}&Email=${email}`,
    resendOTP: email => `Account/Resend-Otp?Email=${email}`,
    setPassword: 'Account/SetPassword',
    createPassword: (email, newPassword) =>
      `Account/SetPassword?Email=${email}&NewPassword=${newPassword}`,
  },
  Benefits: {
    getBenefits: 'Benefit/GetUserBenefits',
  },
  dependent: {
    getDependents: 'ClaimProcess/GetCustomerDependent',
    addDependentRequest: 'Dependent/',
  },
  claimHistory: {
    getAllClaim: 'ClaimProcess/GetAllClaims',
  },
  discountedCenters: {
    getDiscountedCenters: (type) => 
      `DiscountCenterAndHospital/GetAllDiscountCentersOrHospitals?type=${type}`,
  },
  priorApproval: {
    GetPriorApprovalServices: 'PriorApproval/GetPriorApprovalServices',
    addPriorApproval: 'PriorApproval/CreatePriorApprovalRequest',
  },
  UploadAttachment: {
    UploadAttachment: 'General/UploadAttachment',
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
  policy: {
    getPolicyTypes: 'Policy/GetPolicyTypes',
    getPolicyDetails: 'Policy/GetPolicyDetails',
    getMaternity: 'Policy/GetPolicyDetailsMAT',
  },
  coverage: {
    getCoverage: 'Policy/GetPolicyCoverage',
  },
  notifications: {
    getAll: 'PushNotification/getNotifications',
    markAsRead: 'PushNotification/readNotification',
  },
  PriorApprovalHistory: {
    getPriorApprovalRequests: 'PriorApprovals/GetPriorApprovalRequests',
  },
  oladoc: {
    generateToken: 'widgets/authenticate',
  },
};

export default endpoints;
