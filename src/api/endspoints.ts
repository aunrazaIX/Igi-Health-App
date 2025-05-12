const endpoints = {
  bank: {
    getBankDetails: 'Bank/GetBankDetails',
  },
  dependants: {
    getDependants: 'UserRelation/GetOPD',
  },
  claimLogde: {
    attachment: (userId: string, myuuid: string, ClientCode: string) =>
      `Attachment/upload?userId=${userId}&UUID=${myuuid}&ClientCode=${ClientCode}`,
  },
};

export default endpoints;
