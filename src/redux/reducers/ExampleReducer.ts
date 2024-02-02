import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface IExampleState {
  expanded: boolean;
}

const initialState: IExampleState = {
  expanded: true
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExpandedStatus: (state, action) => {
      state.expanded = action.payload;
    }
  }
});

export const { setExpandedStatus } = exampleSlice.actions;

export const selectExampleExpandedState = createSelector(
  (state: RootState) => state.example.expanded,
  (state) => state
);

export default exampleSlice.reducer;
