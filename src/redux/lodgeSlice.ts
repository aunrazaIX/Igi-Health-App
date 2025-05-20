import { createSlice, current } from '@reduxjs/toolkit';
import { clampRGBA } from 'react-native-reanimated/lib/typescript/Colors';

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
  isError: false
};



export const lodgeSlice = createSlice({
  name: 'lodgeSlice',
  initialState,
  reducers: {
    setSelectedPatient: (state, { payload }) => {
      state.selectedPatient = payload;
    },

    setTreatments: (state, action) => {

      if (action?.payload?.length > 0) {
        const existingTreatments = current(state.treatments);

        const newTreatments = action.payload.filter((newItem) => {
          const isDuplicate = existingTreatments.some((existingItem) =>
            existingItem.treatment?.value === newItem.treatment?.value &&
            existingItem.receiptNumber === newItem.receiptNumber &&
            existingItem.amount === newItem.amount &&
            existingItem.description === newItem.description
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



    updateTreatments: (state, { payload }) => {
      const { index, data } = payload;
      const existingTreatments = current(state.treatments);

      const isDuplicate = existingTreatments.some((item, i) =>
        i !== index &&
        item.treatment?.value === data.treatment?.value &&
        item.receiptNumber === data.receiptNumber &&
        item.amount === data.amount &&
        item.description === data.description
      );

      if (isDuplicate) {
        state.isError = true;
      } else {
        state.treatments[index] = data;
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


    onDeleteTreatment: (state, { payload }) => {
      let temp = [...state.treatments];
      temp.splice(payload, 1);
      state.treatments = temp;
    },


  },
});

export const {
  setSelectedPatient,
  setTreatments,
  updateTreatments,
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
} = lodgeSlice.actions;
export const lodegeReducer = lodgeSlice.reducer;
