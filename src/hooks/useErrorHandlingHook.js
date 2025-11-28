import {useState} from 'react';

const useErrorHandlingHook = data => {
  const [apiData, setApiData] = useState(data);

  const setterForApiData = (key, value) => {
    setApiData(prevData => ({
      ...prevData,
      [key]: value,
      [`error_${key}`]:
        value === ''
          ? key === 'userName'
            ? 'Email address is required'
            : key === 'receiptNumber'
            ? 'Receipt number is required'
            : `${key} is required`
          : '',
    }));
  };

  const resetStates = () => {
    setApiData(prevData => {
      const temp = {};
      Object.keys(prevData).forEach(key => {
        if (!key.startsWith('error_')) {
          temp[key] = '';
        }
      });
      return temp;
    });
  };

  const checkForError = () => {
    let isAllowedForProceeding = true;
    const temp = {...apiData};
    for (let keys in apiData) {
      if (!keys.startsWith('error_')) {
        if (
          apiData[keys] == null ||
          apiData[keys] == undefined ||
          apiData[keys] == ''
        ) {
          temp[`error_${keys}`] =
            keys === 'userName'
              ? 'Email address is required'
              : keys === 'receiptNumber'
              ? 'Receipt number is required'
              : `${keys} is required`;
          isAllowedForProceeding = false;
        }
      }
    }
    setApiData(temp);

    return isAllowedForProceeding;
  };
  return {
    apiData,
    setterForApiData,
    checkForError,
    resetStates,
  };
};

export default useErrorHandlingHook;
