/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialSate = {
	courses: null,
	loading: false,
	error: null,
};

export const getInstructor = createAsyncThunk(
	'admin/getInstructor',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.get('/api/users/me');
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const instructorSlice = createSlice({
	name: 'instructor',
	initialState: initialSate,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getInstructor.pending, (state) => {
				state.loading = true;
			})
			.addCase(getInstructor.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload.courses;
			})
			.addCase(getInstructor.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default instructorSlice.reducer;
