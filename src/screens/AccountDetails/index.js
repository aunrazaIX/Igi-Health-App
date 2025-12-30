import React from 'react';
import AccountDetailsView from '../../views/AccountDetails';
import useAccountDetailsViewModel from '../../viewmodels/useAccountDetailsViewModel';

const AccountDetails = () => {
  const {states} = useAccountDetailsViewModel();

  const {data, loading} = states;

  return <AccountDetailsView data={data} loading={loading}/>;
};

export default AccountDetails;
