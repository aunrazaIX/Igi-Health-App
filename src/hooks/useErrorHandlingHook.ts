import {useState} from 'react';

type ApiDataValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ApiData[]
  | Record<string, any>;

type ApiData = Record<string, ApiDataValue>;

type UseErrorHandlingHookReturn = {
  apiData: ApiData;
  setterForApiData: (key: string, value: ApiDataValue) => void;
  checkForError: () => boolean;
  resetStates: () => void;
};

const useErrorHandlingHook = (data: ApiData): UseErrorHandlingHookReturn => {
  const [apiData, setApiData] = useState<ApiData>(data);

  const setterForApiData = (key: string, value: ApiDataValue) => {
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
      const temp: ApiData = {};
      Object.keys(prevData).forEach(key => {
        if (!key.startsWith('error_')) {
          temp[key] = '';
        }
      });
      return temp;
    });
  };

  // const checkForError = (): boolean => {
  //   let isAllowedForProceeding = true;
  //   setApiData(prevData => {
  //     const updatedData = {...prevData};
  //     Object.keys(prevData).forEach(key => {
  //       if (
  //         !key.startsWith('error_') &&
  //         (prevData[key] === null ||
  //           prevData[key] === '' ||
  //           prevData[key] === undefined)
  //       ) {
  //         updatedData[`error_${key}`] =
  //           key === 'userName'
  //             ? 'Email address is required'
  //             : key === 'receiptNumber'
  //             ? 'Receipt number is required'
  //             : `${key} is required`;
  //         isAllowedForProceeding = false;
  //       }
  //     });
  //     return updatedData;
  //   });
  //   return isAllowedForProceeding;
  // };

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
