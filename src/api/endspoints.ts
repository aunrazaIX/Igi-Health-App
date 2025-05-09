const endpoints = {
  bank: {
    getBankDetails: 'Bank/GetBankDetails',
  },
  claimLogde: {
    attachment: (userId, myuuid, ClientCode) =>
      `Attachment/upload?userId=${userId}&UUID=${myuuid.ToString()}&ClientCode=${ClientCode}`,
  },
};

export default endpoints;
