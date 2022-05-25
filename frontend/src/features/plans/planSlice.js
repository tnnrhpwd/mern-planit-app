// The slice represents data in the store -- unique name, inital state, and contains reducers( takes old state + actions => define logic to change the state)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import planService from './planService';                          // import the async functional objects from planService

const initialState = {  // default values for each state change
  plans: [],
  planIsError: false,
  planIsSuccess: false,
  planIsLoading: false,
  planMessage: '',
}

// Create new plan  -- Async functional object -- called from pages using dispatch --CREATE
export const createPlan = createAsyncThunk(
  'plans/create',
  async (planData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token         // get the user token   
      return await planService.createPlan(planData, token)      // pass user token into create plan method to assure that each plan has a user creator
    } catch (error) {
      const planMessage =
        (error.response &&
          error.response.data &&
          error.response.data.planMessage) ||
        error.planMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(planMessage)  // check for any errors associated with async createplan function object imported from planSlice
    }
  }
)

// Get user plans -- READ
export const getPlans = createAsyncThunk(
  'plans/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token         // get the user token  
      // return await planService.getPlans(token)      // pass user token to get all plans from the specific user token
      return await planService.getPlans()      // Get all plans regardless of user logged in
    } catch (error) {
      const planMessage =
        (error.response &&
          error.response.data &&
          error.response.data.planMessage) ||
        error.planMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(planMessage)  // check for any errors associated with async getplans function object imported from planSlice
    }
  }
)

// Update user plan -- UPDATE
export const updatePlan = createAsyncThunk(
  'plans/update',
  async (planData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await planService.updatePlan(planData, token)
    } catch (error) {
      const planMessage =
        (error.response &&
          error.response.data &&
          error.response.data.planMessage) ||
        error.planMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(planMessage)
    }
  }
)

// Delete user plan -- DELETE
export const deletePlan = createAsyncThunk(
  'plans/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await planService.deletePlan(id, token)
    } catch (error) {
      const planMessage =
        (error.response &&
          error.response.data &&
          error.response.data.planMessage) ||
        error.planMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(planMessage)
    }
  }
)

// slice exported inside an object
export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: { // not async  --  async functions go inside thunkfunctions   --- Without Reducers, we'd need to reload the whole page on changes.
    resetPlanSlice: (state) => initialState,  // function sets all plan values back to default.
  },
  extraReducers: (builder) => {// all possible states associated with asyncthunk get,create,delete plans functional objects. 
    builder
      .addCase(createPlan.pending, (state) => {             // create
        state.planIsLoading = true
      })
      .addCase(createPlan.fulfilled, (state, action) => {   // create
        state.planIsLoading = false
        state.planIsSuccess = true
        state.plans.push(action.payload)
      })
      .addCase(createPlan.rejected, (state, action) => {    // create
        state.planIsLoading = false
        state.planIsError = true
        state.planMessage = action.payload
      })
      .addCase(getPlans.pending, (state) => {               // get
        state.planIsLoading = true
      })
      .addCase(getPlans.fulfilled, (state, action) => {     // get
        state.planIsLoading = false
        state.planIsSuccess = true
        state.plans = action.payload
      })
      .addCase(getPlans.rejected, (state, action) => {      // get
        state.planIsLoading = false
        state.planIsError = true
        state.planMessage = action.payload
      })
      .addCase(updatePlan.pending, (state) => {             // update
        state.planIsLoading = true
      })
      .addCase(updatePlan.fulfilled, (state, action) => {   // update
        state.planIsLoading = false
        state.planIsSuccess = true
        state.plans = state.plans.map(
          plan => 
            (plan._id === action.payload._id) 
            ? action.payload 
            : plan 
        )
      })
      .addCase(updatePlan.rejected, (state, action) => {    // update
        state.planIsLoading = false
        state.planIsError = true
        state.planMessage = action.payload
      })
      .addCase(deletePlan.pending, (state) => {             // delete
        state.planIsLoading = true
      })
      .addCase(deletePlan.fulfilled, (state, action) => {   // delete
        state.planIsLoading = false
        state.planIsSuccess = true
        state.plans = state.plans.filter(               // hides the deleted plan from UI when you click delete. Otherwise, It wouldnt disapear until refresh
          (plan) => plan._id !== action.payload.id
        )
      })
      .addCase(deletePlan.rejected, (state, action) => {    // delete
        state.planIsLoading = false
        state.planIsError = true
        state.planMessage = action.payload
      })
  },
})

export const { resetPlanSlice } = planSlice.actions
export default planSlice.reducer
