// The slice represents data in the store -- unique name, inital state, and contains reducers( takes old state + actions => define logic to change the state)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';                          // import the async functional objects from authService

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {  // default values for each state change
  user: user ? user : null,
  authIsError: false,
  authIsSuccess: false,
  authIsLoading: false,
  authMessage: '',
}

// Register user  -- Async functional object -- called from pages using dispatch
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const authMessage =
        (error.response &&
          error.response.data &&
          error.response.data.authMessage) ||
        error.authMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(authMessage) // check for any errors associated with async register function object imported from authSlice
    }
  }
)

// Login user
export const login = createAsyncThunk(
  'auth/login', 
  async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const authMessage =
      (error.response && error.response.data && error.response.data.authMessage) ||
      error.authMessage ||
      error.toString()
    return thunkAPI.rejectWithValue(authMessage) // check for any errors associated with async login function object imported from authSlice
  }
})

// log out user  --- Async function that calls the authService logout function( removes user item from local storage)
export const logout = createAsyncThunk(
  'auth/logout', 
  async () => {
  await authService.logout()   
})


// get user data  --- Async function that calls the authService getmydata function( gets user data from the database )
export const getMyData = createAsyncThunk(
  'auth/getMyData',
  async (thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token         // get the user token  
    return await authService.getMyData(token)                 // sends user jwt token for authentication
  } catch (error) {
    const authMessage =
      (error.response && error.response.data && error.response.data.authMessage) ||
      error.authMessage ||
      error.toString()
    return thunkAPI.rejectWithValue(authMessage) // check for any errors associated with async login function object imported from authSlice
  }
})


// slice exported inside an object
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { // not async  --  async functions go inside thunkfunctions   --- Without Reducers, we'd need to reload the whole page on changes.
    resetAuthSlice: (state) => {   // function sets values back to default, except the user. the user data must remain
      state.authIsLoading = false
      state.authIsSuccess = false
      state.authIsError = false
      state.authMessage = ''
    },
  },
  extraReducers: (builder) => {       // all possible states associated with asyncthunk register + login + logout functional objects. 
    builder
      .addCase(register.pending, (state) => {
        state.authIsLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.authIsLoading = false
        state.authIsSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.authIsLoading = false
        state.authIsError = true
        state.authMessage = action.payload        // deals with thunkAPI.rejectWithValue(authMessage)
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.authIsLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authIsLoading = false
        state.authIsSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.authIsLoading = false
        state.authIsError = true
        state.authMessage = action.payload          // deals with thunkAPI.rejectWithValue(authMessage)
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(getMyData.pending, (state) => {
        state.authIsLoading = true
      })
      .addCase(getMyData.fulfilled, (state, action) => {
        state.authIsLoading = false
        state.authIsSuccess = true
        state.user = action.payload
      })
      .addCase(getMyData.rejected, (state, action) => {
        state.authIsLoading = false
        state.authIsError = true
        state.authMessage = action.payload              // deals with thunkAPI.rejectWithValue(authMessage)
      })
  },
})

export const { resetAuthSlice } = authSlice.actions  // brings reset into components where it can take action
export default authSlice.reducer; // exports reset function by default  -- EXPORTED TO store.js
