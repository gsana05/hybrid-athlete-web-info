import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const adminLoginSlice = createSlice({
  name: 'adminLogin',
  initialState: {
    value: false
  },
  reducers: {
    logAdminUserInAuth : (state, action) => {
        state.value = action.payload
    }
  }
})

export const isUserLoggedIn = (state: RootState) => state.adminLogin.value;

export const { logAdminUserInAuth } = adminLoginSlice.actions

export default adminLoginSlice.reducer