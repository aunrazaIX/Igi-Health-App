import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import { setErrorModal } from './generalSlice';

const initialState: {
  currentStep: number;
  selectedPatient: any | null;
  selectedDocuments: any[];
  remarks: string
  treatments: any[];
  isError: boolean;
} = {
  currentStep: 1,
  selectedPatient: null,
  selectedDocuments: [],
  treatments: [],
  isError: false,
  remarks: ""

};



export const updateTreatments = createAsyncThunk(
  'lodge/update',
  async (_data, thunkApi) => {

    const { index, data, navigateOnSuccess } = _data;
    const { treatments } = thunkApi.getState()?.lodge;
    if (
      !data?.receiptNumber ||
      !data?.amount ||
      !data?.description ||
      !data?.treatment?.ClaimsSubTypeName
    ) {
      thunkApi.dispatch(setErrorModal({ message: 'Please enter all details' }));
      return;
    }
    if (data?.receiptNumber !== treatments[index]?.receiptNumber) {
      const isDuplicate = treatments?.some((item) => item?.receiptNumber == data?.receiptNumber)
      if (isDuplicate) {
        thunkApi.dispatch(setErrorModal({ message: 'Record Already Exist' }));
      }
      else {
        thunkApi.dispatch(_updateTreatmentData({ index, data, navigateOnSuccess }));

      }
    }
    else {
      thunkApi.dispatch(_updateTreatmentData({ index, data, navigateOnSuccess }));
    }
  },
);



export const setTreatments = createAsyncThunk(
  'lodge/add',
  async (_data, thunkApi) => {
    const { treatments } = thunkApi.getState()?.lodge;
    const isDuplicate = treatments?.some(
      treatment => treatment?.receiptNumber == _data?.receiptNumber,
    );

    if (
      !_data?.receiptNumber ||
      !_data?.amount ||
      !_data?.description ||
      !_data?.treatment?.ClaimsSubTypeName
    ) {
      thunkApi.dispatch(setErrorModal({ message: 'Please enter all details' }));
      return;
    }




    if (isDuplicate) {
      thunkApi.dispatch(setErrorModal({ message: 'Record Already Exist' }));
    }
    else {
      thunkApi.dispatch(_setTreatmentData({ _data }));
    }
  },

);




export const lodgeSlice = createSlice({
  name: 'lodgeSlice',
  initialState,
  reducers: {
    setSelectedPatient: (state, { payload }) => {
      state.selectedPatient = payload;
    },

    _setTreatmentData: (state, { payload }) => {
      if (payload?._data) {
        const { _data } = payload
        _data?.navigateOnSuccess()
        delete _data?.navigateOnSuccess
        state.treatments = [...state.treatments, _data];
      }
      else {
        state.treatments = []
      }

    },

    _updateTreatmentData: (state, { payload }) => {


      const { index, data, navigateOnSuccess } = payload;

      console.log(data, "payload of update")

      navigateOnSuccess();

      state.treatments[index] = data;
    },




    setStep: (state, action) => {
      state.currentStep = action.payload;
    },

    setSelectedDocuments: (state, action) => {
      if (action?.payload?.length > 0) {
        state.selectedDocuments = [
          ...state.selectedDocuments,
          ...action.payload,
        ];
      } else {
        state.selectedDocuments = [];
      }
    },

    onDeleteDocuments: (state, { payload }) => {

      console.log(payload, "payload")
      let temp = [...state.selectedDocuments];

      temp.splice(payload, 1);

      state.selectedDocuments = temp;

    }

    ,

    onDeleteTreatment: (state, { payload }) => {
      let temp = [...state.treatments];
      temp.splice(payload, 1);
      state.treatments = temp;
    },

    setRemarks: (state, { payload }) => {

      state.remarks = payload
    },


  },
});

export const {
  setSelectedPatient,
  _setTreatmentData,
  _updateTreatmentData,
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
  onDeleteDocuments,
  setRemarks,


} = lodgeSlice.actions;
export const lodegeReducer = lodgeSlice.reducer;
