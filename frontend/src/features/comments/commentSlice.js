// The slice represents data in the store -- unique name, inital state, and contains reducers( takes old state + actions => define logic to change the state)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';                          // import the async functional objects from commentService

const initialState = {  // default values for each state change
  comments: [],
  commentIsError: false,
  commentIsSuccess: false,
  commentIsLoading: false,
  commentMessage: '',
}

// Create new comment  -- Async functional object -- called from pages using dispatch --CREATE
export const createComment = createAsyncThunk(
  'comments/create',
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token         // get the user token   
      return await commentService.createComment(commentData, token)      // pass user token into create comment method to assure that each comment has a user creator
    } catch (error) {
      const commentMessage =
        (error.response &&
          error.response.data &&
          error.response.data.commentMessage) ||
        error.commentMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(commentMessage)  // check for any errors associated with async createcomment function object imported from commentSlice
    }
  }
)

// Get user comments -- READ
export const getComments = createAsyncThunk(
  'comments/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token         // get the user token  
      // return await commentService.getComments(token)      // pass user token to get all comments from the specific user token
      return await commentService.getComments()      // Get all comments regardless of user logged in
    } catch (error) {
      const commentMessage =
        (error.response &&
          error.response.data &&
          error.response.data.commentMessage) ||
        error.commentMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(commentMessage)  // check for any errors associated with async getcomments function object imported from commentSlice
    }
  }
)

// Update user comment -- UPDATE
export const updateComment = createAsyncThunk(
  'comments/delete',
  async (id, commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await commentService.updateComment(id, commentData, token)
    } catch (error) {
      const commentMessage =
        (error.response &&
          error.response.data &&
          error.response.data.commentMessage) ||
        error.commentMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(commentMessage)
    }
  }
)

// Delete user comment -- DELETE
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await commentService.deleteComment(id, token)
    } catch (error) {
      const commentMessage =
        (error.response &&
          error.response.data &&
          error.response.data.commentMessage) ||
        error.commentMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(commentMessage)
    }
  }
)

// slice exported inside an object
export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: { // not async  --  async functions go inside thunkfunctions   --- Without Reducers, we'd need to reload the whole page on changes.
    resetCommentSlice: (state) => initialState,  // function sets all comment values back to default.
  },
  extraReducers: (builder) => {// all possible states associated with asyncthunk get,create,delete comments functional objects. 
    builder
      .addCase(createComment.pending, (state) => {
        state.commentIsLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentIsLoading = false
        state.commentIsSuccess = true
        state.comments.push(action.payload)
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentIsLoading = false
        state.commentIsError = true
        state.commentMessage = action.payload
      })
      .addCase(getComments.pending, (state) => {
        state.commentIsLoading = true
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentIsLoading = false
        state.commentIsSuccess = true
        state.comments = action.payload
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentIsLoading = false
        state.commentIsError = true
        state.commentMessage = action.payload
      })
      .addCase(deleteComment.pending, (state) => {
        state.commentIsLoading = true
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.commentIsLoading = false
        state.commentIsSuccess = true
        state.comments = state.comments.filter(               // hides the deleted comment from UI when you click delete. Otherwise, It wouldnt disapear until refresh
          (comment) => comment._id !== action.payload.id
        )
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.commentIsLoading = false
        state.commentIsError = true
        state.commentMessage = action.payload
      })
  },
})

export const { resetCommentSlice } = commentSlice.actions
export default commentSlice.reducer
