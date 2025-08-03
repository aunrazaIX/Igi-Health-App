import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';

import {setErrorModal} from './generalSlice';

const moduleNames = ['lodgeClaim', 'priorApproval'];

const initialModuleState: {
  currentStep: number;
  selectedPatient: any | null;
  selectedType: any | null;
  selectedMaternityType: any | null;
  selectedHospital: any | null;
  selectedDocuments: any[];
  remarks: string;
  treatments: any[];
  isError: boolean;
  userPassword: any;
} = {
  currentStep: 1,
  selectedPatient: null,
  selectedMaternityType: null,
  selectedHospital: null,
  selectedDocuments: [],
  treatments: [],
  isError: false,
  remarks: '',
  userPassword: '',
};

const initialState = {
  activeModule: 'lodgeClaim',
  modules: {
    lodgeClaim: {...initialModuleState},
    priorApproval: {...initialModuleState},
  },
};

export const updateTreatments = createAsyncThunk(
  'lodge/update',
  async (_data, thunkApi) => {
    const {index, data, navigateOnSuccess} = _data;
    const state = thunkApi.getState()?.lodge;
    const treatments = state.modules[state.activeModule].treatments;
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
    const state = thunkApi.getState()?.lodge;

    const treatments = state.modules[state.activeModule].treatments;
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
    setActiveModule: (state, {payload}) => {
      if (moduleNames.includes(payload)) {
        state.activeModule = payload;
      }
    },
    setSelectedPatient: (state, {payload}) => {
      state.modules[state.activeModule].selectedPatient = payload;
    },
    setSelectedType: (state, {payload}) => {
      state.modules[state.activeModule].selectedType = payload;
    },
    setSelectedMaternityType: (state, {payload}) => {
      state.modules[state.activeModule].selectedMaternityType = payload;
    },
    setSelectedHospital: (state, {payload}) => {
      state.modules[state.activeModule].selectedHospital = payload;
    },

    setResetTreaments: state => {
      state.modules[state.activeModule].treatments = [];
    },
    _setTreatmentData: (state, {payload}) => {
      if (payload?._data) {
        const {_data} = payload;
        _data?.navigateOnSuccess();
        delete _data?.navigateOnSuccess;
        state.modules[state.activeModule].treatments.push(_data);
      } else {
        state.modules[state.activeModule].treatments = [];
      }
    },

    _updateTreatmentData: (state, {payload}) => {
      const {index, data, navigateOnSuccess} = payload;
      navigateOnSuccess();
      state.modules[state.activeModule].treatments[index] = data;
    },

    setStep: (state, action) => {
      state.modules[state.activeModule].currentStep = action.payload;
    },

    setSelectedDocuments: (state, action) => {
      if (action?.payload?.length > 0) {
        state.modules[state.activeModule].selectedDocuments = [
          ...state.modules[state.activeModule].selectedDocuments,
          ...action.payload,
        ];
      } else {
        state.modules[state.activeModule].selectedDocuments = [];
      }
    },

    onDeleteDocuments: (state, {payload}) => {
      let temp = [...state.modules[state.activeModule].selectedDocuments];

      temp.splice(payload, 1);

      state.modules[state.activeModule].selectedDocuments = temp;
    },

    onDeleteTreatment: (state, {payload}) => {
      let temp = [...state.modules[state.activeModule].treatments];
      temp.splice(payload, 1);
      state.modules[state.activeModule].treatments = temp;
    },

    setRemarks: (state, {payload}) => {
      state.modules[state.activeModule].remarks = payload;
    },

    setUserEmail: (state, {payload}) => {
      state.modules[state.activeModule].userPassword = payload;
    },
    resetAllModules: state => {
      console.log('Resetting all modules test');
      state.modules = {
        lodgeClaim: {...initialModuleState},
        priorApproval: {...initialModuleState},
      };
      state.activeModule = 'lodgeClaim';
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
  setUserEmail,
  setActiveModule,
  resetAllModules,
} = lodgeSlice.actions;
export const lodegeReducer = lodgeSlice.reducer;
