const endpoints = {
  auth: {login: 'Login/Login'},
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
    attachment: (userId: string, myuuid: string, ClientCode: string) =>
      `Attachment/upload?userId=${userId}&UUID=${myuuid}&ClientCode=${ClientCode}`,
  },
  claimHistory: {
    getAllClaim: 'Claims/getClaimsView',
  },
};

export default endpoints;
