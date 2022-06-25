// The slice represents data in the store -- unique name, inital state, and contains reducers( takes old state + actions => define logic to change the state)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import actionService from './actionService';                          // import the async functional objects from actionService

const initialState = {  // default values for each state change
  actions: [],
  actionIsError: false,
  actionIsSuccess: false,
  actionIsLoading: false,
  actionMessage: '',
}

// Create new action  -- Async functional object -- called from pages using dispatch --CREATE
export const createAction = createAsyncThunk(
  'actions/create',
  async (actionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token         // get the user token   
      return await actionService.createAction(actionData, token)      // pass user token into create action method to assure that each action has a user creator
    } catch (error) {
      const actionMessage =
        (error.response &&
          error.response.data &&
          error.response.data.actionMessage) ||
        error.actionMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(actionMessage)  // check for any errors associated with async createaction function object imported from actionSlice
    }
  }
)

// Get user actions -- READ
export const getActions = createAsyncThunk(
  'actions/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token         // get the user token  
      // return await actionService.getActions(token)      // pass user token to get all actions from the specific user token
      return await actionService.getActions()      // Get all actions regardless of user logged in
    } catch (error) {
      const actionMessage =
        (error.response &&
          error.response.data &&
          error.response.data.actionMessage) ||
        error.actionMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(actionMessage)  // check for any errors associated with async getactions function object imported from actionSlice
    }
  }
)

// Update user action -- UPDATE
export const updateAction = createAsyncThunk(
  'actions/update',
  async (actionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await actionService.updateAction(actionData, token)
    } catch (error) {
      const actionMessage =
        (error.response &&
          error.response.data &&
          error.response.data.actionMessage) ||
        error.actionMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(actionMessage)
    }
  }
)

// Delete user action -- DELETE
export const deleteAction = createAsyncThunk(
  'actions/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await actionService.deleteAction(id, token)
    } catch (error) {
      const actionMessage =
        (error.response &&
          error.response.data &&
          error.response.data.actionMessage) ||
        error.actionMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(actionMessage)
    }
  }
)

// slice exported inside an object
export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: { // not async  --  async functions go inside thunkfunctions   --- Without Reducers, we'd need to reload the whole page on changes.
    resetActionSlice: (state) => initialState,  // function sets all action values back to default.
  },
  extraReducers: (builder) => {// all possible states associated with asyncthunk get,create,delete actions functional objects. 
    builder
      .addCase(createAction.pending, (state) => {             // create
        state.actionIsLoading = true
      })
      .addCase(createAction.fulfilled, (state, action) => {   // create
        state.actionIsLoading = false
        state.actionIsSuccess = true
        state.actions.push(action.payload)
      })
      .addCase(createAction.rejected, (state, action) => {    // create
        state.actionIsLoading = false
        state.actionIsError = true
        state.actionMessage = action.payload
      })
      .addCase(getActions.pending, (state) => {               // get
        state.actionIsLoading = true
      })
      .addCase(getActions.fulfilled, (state, action) => {     // get
        state.actionIsLoading = false
        state.actionIsSuccess = true
        state.actions = action.payload
      })
      .addCase(getActions.rejected, (state, action) => {      // get
        state.actionIsLoading = false
        state.actionIsError = true
        state.actionMessage = action.payload
      })
      .addCase(updateAction.pending, (state) => {             // update
        state.actionIsLoading = true
      })
      .addCase(updateAction.fulfilled, (state, action) => {   // update
        state.actionIsLoading = false
        state.actionIsSuccess = true
        state.actions = state.actions.map(
          action => 
            (action._id === action.payload._id) 
            ? action.payload 
            : action 
        )
      })
      .addCase(updateAction.rejected, (state, action) => {    // update
        state.actionIsLoading = false
        state.actionIsError = true
        state.actionMessage = action.payload
      })
      .addCase(deleteAction.pending, (state) => {             // delete
        state.actionIsLoading = true
      })
      .addCase(deleteAction.fulfilled, (state, action) => {   // delete
        state.actionIsLoading = false
        state.actionIsSuccess = true
        state.actions = state.actions.filter(               // hides the deleted action from UI when you click delete. Otherwise, It wouldnt disapear until refresh
          (action) => action._id !== action.payload.id
        )
      })
      .addCase(deleteAction.rejected, (state, action) => {    // delete
        state.actionIsLoading = false
        state.actionIsError = true
        state.actionMessage = action.payload
      })
  },
})

export const { resetActionSlice } = actionSlice.actions
export default actionSlice.reducer
