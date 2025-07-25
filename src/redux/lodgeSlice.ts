import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';

import {setErrorModal} from './generalSlice';

const initialState: {
  currentStep: number;
  selectedPatient: any | null;
  selectedType: any | null;
  selectedMaternityType: any | null;
  selectedHospital: any | null;
  selectedDocuments: any[];
  remarks: string;
  treatments: any[];
  isError: boolean;
} = {
  currentStep: 1,
  selectedPatient: null,
  selectedMaternityType: null,
  selectedHospital: null,
  selectedDocuments: [],
  treatments: [],
  isError: false,
  remarks: '',
};

export const updateTreatments = createAsyncThunk(
  'lodge/update',
  async (_data, thunkApi) => {
    const {index, data, navigateOnSuccess} = _data;
    const {treatments} = thunkApi.getState()?.lodge;
    if (
      !data?.receiptNumber ||
      !data?.amount ||
      !data?.description ||
      !data?.treatment
    ) {
      thunkApi.dispatch(
        setErrorModal({
          message: 'Please Enter All Details',
          detail:
            'Some fields are missing all fields must be required to update a claim',
        }),
      );
      return;
    }

    if (data?.receiptNumber !== treatments[index]?.receiptNumber) {
      const isDuplicate = treatments?.some(
        item => item?.receiptNumber == data?.receiptNumber,
      );
      if (isDuplicate) {
        thunkApi.dispatch(setErrorModal({message: 'Record Already Exist'}));
      } else {
        thunkApi.dispatch(
          _updateTreatmentData({index, data, navigateOnSuccess}),
        );
      }
    } else {
      thunkApi.dispatch(_updateTreatmentData({index, data, navigateOnSuccess}));
    }
  },
);

export const setTreatments = createAsyncThunk(
  'lodge/add',
  async (_data, thunkApi) => {
    const {treatments} = thunkApi.getState()?.lodge;
    const isDuplicate = treatments?.some(
      treatment => treatment?.receiptNumber == _data?.receiptNumber,
    );

    if (
      !_data?.receiptNumber ||
      !_data?.amount ||
      !_data?.description ||
      !_data?.treatment
    ) {
      thunkApi.dispatch(
        setErrorModal({
          message: 'Please enter all details',
          detail:
            'Some fields are missing all feilds must be required to create a claim',
        }),
      );
      return;
    }

    if (_data?.amount <= 0) {
      thunkApi.dispatch(
        setErrorModal({message: 'Amount must be greater than zero'}),
      );
      return;
    }
    if (isDuplicate) {
      thunkApi.dispatch(setErrorModal({message: 'Record Already Exist'}));
    } else {
      thunkApi.dispatch(_setTreatmentData({_data}));
    }
  },
);

export const lodgeSlice = createSlice({
  name: 'lodgeSlice',
  initialState,
  reducers: {
    setSelectedPatient: (state, {payload}) => {
      state.selectedPatient = payload;
    },
    setSelectedType: (state, {payload}) => {
      state.selectedType = payload;
    },
    setSelectedMaternityType: (state, {payload}) => {
      state.selectedMaternityType = payload;
    },
    setSelectedHospital: (state, {payload}) => {
      state.selectedHospital = payload;
    },

    setResetTreaments: state => {
      state.treatments = [];
    },
    _setTreatmentData: (state, {payload}) => {
      if (payload?._data) {
        const {_data} = payload;

        _data?.navigateOnSuccess();
        delete _data?.navigateOnSuccess;
        state.treatments = [...state.treatments, _data];
      } else {
        state.treatments = [];
      }
    },

    _updateTreatmentData: (state, {payload}) => {
      const {index, data, navigateOnSuccess} = payload;
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

    onDeleteDocuments: (state, {payload}) => {
      let temp = [...state.selectedDocuments];

      temp.splice(payload, 1);

      state.selectedDocuments = temp;
    },

    onDeleteTreatment: (state, {payload}) => {
      let temp = [...state.treatments];
      temp.splice(payload, 1);
      state.treatments = temp;
    },

    setRemarks: (state, {payload}) => {
      state.remarks = payload;
    },
  },
});

export const {
  setSelectedPatient,
  setSelectedHospital,
  _setTreatmentData,
  _updateTreatmentData,
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
  onDeleteDocuments,
  setRemarks,
  setSelectedType,
  setSelectedMaternityType,
  setResetTreaments,
} = lodgeSlice.actions;
export const lodegeReducer = lodgeSlice.reducer;
