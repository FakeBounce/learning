import { createSlice } from '@reduxjs/toolkit';

interface RolesState {}

const initialState: RolesState = {};

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {}
});

export default rolesSlice.reducer;
