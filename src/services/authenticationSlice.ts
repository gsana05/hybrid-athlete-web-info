import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { RootState } from '../app/store';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    value: false
  },
  reducers: {
    setAuthentication : (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    }

  }
})

export const authenticationTracker = (state: RootState) => state.authentication.value;

export const { setAuthentication } = authenticationSlice.actions

export default authenticationSlice.reducer