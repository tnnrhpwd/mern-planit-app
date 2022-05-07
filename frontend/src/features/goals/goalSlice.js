// The slice represents data in the store -- unique name, inital state, and contains reducers( takes old state + actions => define logic to change the state)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';                          // import the async functional objects from goalService

const initialState = {  // default values for each state change
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new goal  -- Async functional object -- called from pages using dispatch
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token         // get the user token   
      return await goalService.createGoal(goalData, token)      // pass user token into create goal method to assure that each goal has a user creator
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)  // check for any errors associated with async creategoal function object imported from goalSlice
    }
  }
)

// Get user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token         // get the user token  
      return await goalService.getGoals(token)      // pass user token to get all goals from the specific user token
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)  // check for any errors associated with async getgoals function object imported from goalSlice
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// slice exported inside an object
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: { // not async  --  async functions go inside thunkfunctions   --- Without Reducers, we'd need to reload the whole page on changes.
    reset: (state) => initialState,  // function sets all goal values back to default.
  },
  extraReducers: (builder) => {// all possible states associated with asyncthunk get,create,delete goals functional objects. 
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(               // hides the deleted goal from UI when you click delete. Otherwise, It wouldnt disapear until refresh
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
