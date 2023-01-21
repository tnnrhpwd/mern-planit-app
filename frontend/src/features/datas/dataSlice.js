// The slice represents data in the store -- unique name, inital state, and contains reducers( takes old state + actions => define logic to change the state)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataService from './dataService';                          // import the async functional objects from dataService

const initialState = {  // default values for each state change
  datas: [],
  dataIsError: false,
  dataIsSuccess: false,
  dataIsLoading: false,
  dataMessage: '',
}

// Create new data  -- Async functional object -- called from pages using dispatch --CREATE
export const createData = createAsyncThunk(
  'datas/create',
  async (dataData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token         // get the user token   
      return await dataService.createData(dataData, token)      // pass user token into create data method to assure that each data has a user creator
    } catch (error) {
      const dataMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dataMessage) ||
        error.dataMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dataMessage)  // check for any errors associated with async createdata function object imported from dataSlice
    }
  }
)

// Get user datas -- READ
export const getDatas = createAsyncThunk(
  'datas/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token         // get the user token  
      // return await dataService.getDatas(token)      // pass user token to get all datas from the specific user token
      return await dataService.getDatas()      // Get all datas regardless of user logged in
    } catch (error) {
      const dataMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dataMessage) ||
        error.dataMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dataMessage)  // check for any errors associated with async getdatas function object imported from dataSlice
    }
  }
)

// Update user data -- UPDATE
export const updateData = createAsyncThunk(
  'datas/update',
  async (dataData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.updateData(dataData, token)
    } catch (error) {
      const dataMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dataMessage) ||
        error.dataMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dataMessage)
    }
  }
)

// Delete user data -- DELETE
export const deleteData = createAsyncThunk(
  'datas/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await dataService.deleteData(id, token)
    } catch (error) {
      const dataMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dataMessage) ||
        error.dataMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dataMessage)
    }
  }
)

// slice exported inside an object
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: { // not async  --  async functions go inside thunkfunctions   --- Without Reducers, we'd need to reload the whole page on changes.
    resetDataSlice: (state) => initialState,  // function sets all data values back to default.
  },
  extraReducers: (builder) => {// all possible states associated with asyncthunk get,create,delete datas functional objects. 
    builder
      .addCase(createData.pending, (state) => {             // create
        state.dataIsLoading = true
      })
      .addCase(createData.fulfilled, (state, action) => {   // create
        state.dataIsLoading = false
        state.dataIsSuccess = true
        state.datas.push(action.payload)
      })
      .addCase(createData.rejected, (state, action) => {    // create
        state.dataIsLoading = false
        state.dataIsError = true
        state.dataMessage = action.payload
      })
      .addCase(getDatas.pending, (state) => {               // get
        state.dataIsLoading = true
      })
      .addCase(getDatas.fulfilled, (state, action) => {     // get
        state.dataIsLoading = false
        state.dataIsSuccess = true
        state.datas = action.payload
      })
      .addCase(getDatas.rejected, (state, action) => {      // get
        state.dataIsLoading = false
        state.dataIsError = true
        state.dataMessage = action.payload
      })
      .addCase(updateData.pending, (state) => {             // update
        state.dataIsLoading = true
      })
      .addCase(updateData.fulfilled, (state, action) => {   // update
        state.dataIsLoading = false
        state.dataIsSuccess = true
        state.datas = state.datas.map(
          data => 
            (data._id === action.payload._id) 
            ? action.payload 
            : data 
        )
      })
      .addCase(updateData.rejected, (state, action) => {    // update
        state.dataIsLoading = false
        state.dataIsError = true
        state.dataMessage = action.payload
      })
      .addCase(deleteData.pending, (state) => {             // delete
        state.dataIsLoading = true
      })
      .addCase(deleteData.fulfilled, (state, action) => {   // delete
        state.dataIsLoading = false
        state.dataIsSuccess = true
        state.datas = state.datas.filter(               // hides the deleted data from UI when you click delete. Otherwise, It wouldnt disapear until refresh
          (data) => data._id !== action.payload.id
        )
      })
      .addCase(deleteData.rejected, (state, action) => {    // delete
        state.dataIsLoading = false
        state.dataIsError = true
        state.dataMessage = action.payload
      })
  },
})

export const { resetDataSlice } = dataSlice.actions
export default dataSlice.reducer
