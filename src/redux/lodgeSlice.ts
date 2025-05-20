import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import {clampRGBA} from 'react-native-reanimated/lib/typescript/Colors';
import {setErrorModal} from './generalSlice';

const initialState: {
  currentStep: number;
  selectedPatient: any | null;
  selectedDocuments: any[];
  treatments: any[];
  isError: boolean;
} = {
  currentStep: 1,
  selectedPatient: null,
  selectedDocuments: [],
  treatments: [],
  isError: false,
};

export const updateTreatments = createAsyncThunk(
  'lodge/update',
  async (_data, thunkApi) => {
    const {index, data} = _data;
    const {treatments} = thunkApi.getState()?.lodge;
    const isDuplicate = treatments?.some(
      treatment => treatment?.receiptNumber == data?.receiptNumber,
    );
    if (isDuplicate) {
      thunkApi.dispatch(setErrorModal({message: 'Record Already Exist'}));
    } else {
      thunkApi.dispatch(_updateTreatmentData({index, data}));
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

    setTreatments: (state, action) => {
      if (action?.payload?.length > 0) {
        const existingTreatments = current(state.treatments);

        const newTreatments = action.payload.filter(newItem => {
          const isDuplicate = existingTreatments.some(
            existingItem =>
              existingItem.treatment?.value === newItem.treatment?.value &&
              existingItem.receiptNumber === newItem.receiptNumber &&
              existingItem.amount === newItem.amount &&
              existingItem.description === newItem.description,
          );

          if (isDuplicate) {
            state.isError = true;
          }

          return !isDuplicate;
        });

        state.treatments = [...state.treatments, ...newTreatments];
      } else {
        state.treatments = [];
      }
    },

    _updateTreatmentData: (state, {payload}) => {
      const {index, data} = payload;
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

    onDeleteTreatment: (state, {payload}) => {
      let temp = [...state.treatments];
      temp.splice(payload, 1);
      state.treatments = temp;
    },
  },
});

export const {
  setSelectedPatient,
  setTreatments,
  _updateTreatmentData,
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
} = lodgeSlice.actions;
export const lodegeReducer = lodgeSlice.reducer;
