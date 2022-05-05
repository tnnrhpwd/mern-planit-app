// global store object - registers all reducers defined elsewhere
// reducer - takes in old state + action => returns new state
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import commentReducer from '../features/auth/authSlice'
import planReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    comments: commentReducer,
    plans: planReducer,
  },
});
