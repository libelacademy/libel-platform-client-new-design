/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAdmin } from './admin.slice';
import { getInstructor } from './instructor.slice';
import { getStudent } from './student.slice';

const initialSate = {
	user: null,
	profile: null,
	loggedIn: false,
	loading: false,
	error: null,
	updating: false,
};

export const login = createAsyncThunk(
	'auth/login',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.post(
				'/api/auth/login',
				payload,
			);

			if (response.data.role === 'admin') {
				thunkAPI.dispatch(getAdmin());
			}

			if (response.data.role === 'instructor') {
				thunkAPI.dispatch(getInstructor());
			}

			if (response.data.role === 'student') {
				thunkAPI.dispatch(getStudent());
			}
			
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const session = createAsyncThunk(
	'auth/session',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.get('/api/auth/me');
			if (response.data.role === 'admin') {
				thunkAPI.dispatch(getAdmin());
			}

			if (response.data.role === 'instructor') {
				thunkAPI.dispatch(getInstructor());
			}
			
			if (response.data.role === 'student') {
				thunkAPI.dispatch(getStudent());
			}

			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const logout = createAsyncThunk(
	'auth/logout',
	async (payload, thunkAPI) => {
		try {
			const response = await axios.post('/api/auth/logout');
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const register = createAsyncThunk(
	'auth/register',
	async (payload, thunkAPI) => {
		try {
			const response = await axios.post(
				'/api/auth/register',
				payload,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async (payload, thunkAPI) => {
		try {
			console.log(payload);
			const response = await axios.put('/api/users/me', payload);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialSate,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.data;
			state.loggedIn = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(session.pending, (state) => {
			state.loading = true;
		}),
			builder.addCase(session.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.data;
				state.loggedIn = true;
			});
		builder.addCase(session.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(logout.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state.loading = false;
			state.user = null;
			state.profile = null;
			state.loggedIn = false;
		});
		builder.addCase(logout.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(register.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.data.user;
			state.profile = action.payload.data.profile;
			state.loggedIn = true;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.data;
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default authSlice.reducer;
