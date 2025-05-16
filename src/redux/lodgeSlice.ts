import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  currentStep: number;
  selectedPatient: any | null;
  selectedDocuments: any[];
  treatments: any[];
} = {
  currentStep: 1,
  selectedPatient: null,
  selectedDocuments: [],
  treatments: [],
};

export const lodgeSlice = createSlice({
  name: 'lodgeSlice',
  initialState,
  reducers: {
    setSelectedPatient: (state, {payload}) => {
      state.selectedPatient = payload;
    },
    setTreatments: (state, action) => {
      if (action?.payload?.length > 0) {
        state.treatments = [...state.treatments, ...action.payload];
      } else {
        state.treatments = [];
      }
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
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
} = lodgeSlice.actions;
export const lodegeReducer = lodgeSlice.reducer;
