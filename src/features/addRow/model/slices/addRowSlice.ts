import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Outlay } from 'entities/Outlay';
import { AddRowSchema } from '../types/addRowSchema';

const initialState: AddRowSchema = {
  data: {
    rowName: '',
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0,
    child: [],
  },
};

export const addRowSlice = createSlice({
  name: 'addRow',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Outlay>) => {
      state.data = action.payload;
    },
    reset: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { actions: addRowActions } = addRowSlice;
export const { reducer: addRowReducer } = addRowSlice;
