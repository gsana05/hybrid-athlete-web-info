import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import adminLoginReducer from '../features/adminLogIn/adminLoginSlice';
import authenticationReducer from '../services/authenticationSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navigation : navigationReducer, 
    adminLogin : adminLoginReducer,
    authentication : authenticationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
