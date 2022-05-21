import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { RootState } from '../../app/store';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    value: 1
  },
  reducers: {
    changePageIndex : (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    }

  }
})

export const tabTracker = (state: RootState) => state.navigation.value;

export const { changePageIndex } = navigationSlice.actions

export default navigationSlice.reducer