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
  account: {
    getBankDetails: cnic => `Account/GetBankDetails?Cnic=${cnic}`,
  },
  benefits: {
    getBenefits: 'Benefit/GetUserBenefits',
  },
  dependent: {
    getDependents: 'ClaimProcess/GetCustomerDependent',
    addDependentRequest: 'DependentRequest/CreateDependentRequest',
  },
  claimHistory: {
    getAllClaim: 'ClaimProcess/GetAllUserClaims',
    getDxcClaims: 'ClaimProcess/GetDXCClaimByUser',
  },
  discountedCenters: {
    getDiscountedCenters: type =>
      `DiscountCenterAndHospital/GetAllDiscountCentersOrHospitals?type=${type}`,
  },
  priorApproval: {
    GetPriorApprovalServices: 'PriorApproval/GetPriorApprovalServices',
    addPriorApproval: 'PriorApproval/CreatePriorApprovalRequest',
    getPriorApprovalHistory: 'PriorApproval/GetAllPriorApprovalsForUsers',
  },
  UploadAttachment: {
    UploadAttachment: 'General/UploadAttachment',
  },
  policy: {
    getPolicyDetails: policyNumber =>
      `Policy/GetPolicyDetail?PolicyNumber=${policyNumber}`,
  },
  notifications: {
    getAll: 'Notification/GetUserNotifications',
    markAsRead: id =>
      `Notification/UpdateNotificationSatusToRead?NotificationId=${id}`,
  },
  oladoc: {
    generateToken: 'widgets/authenticate',
  },
};

export default endpoints;
