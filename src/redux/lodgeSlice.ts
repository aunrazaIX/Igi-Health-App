import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  currentStep: number;
  selectedPatinet: any | null;
  selectedDocuments: any[];
  treatments: any[];
} = {
  currentStep: 1,
  selectedPatinet: null,
  selectedDocuments: [],
  treatments: [],
};

export const lodgeSlice = createSlice({
  name: 'lodgeSlice',
  initialState,
  reducers: {
    setSelectedPatinet: (state, {payload}) => {
      state.selectedPatinet = payload;
    },
    setTreatments: (state, action) => {
      state.treatments = [...state.treatments, action.payload];
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setSelectedDocuments: (state, action) => {
      state.selectedDocuments = [...state.selectedDocuments, action.payload];
    },
  },
});

export const {setSelectedPatinet, setTreatments, setStep} = lodgeSlice.actions;
export const lodegeReducer = lodgeSlice.reducer;
