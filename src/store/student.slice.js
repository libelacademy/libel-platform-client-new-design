
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialSate = {
	enrollments: null,
  likes: null,
  loading: false,
	error: null,
};


export const getStudent = createAsyncThunk(
	'admin/getStudent',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.get('/api/users/me');
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);


export const studentSlice = createSlice({
  name: 'student',
  initialState: initialSate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.enrollments;
        state.likes = action.payload.likes;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export default studentSlice.reducer