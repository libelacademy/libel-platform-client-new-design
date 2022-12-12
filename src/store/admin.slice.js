/** @format */

import {
	createSlice,
	createAsyncThunk,
	autoBatchEnhancer,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialSate = {
	courses: [],
	categories: null,
	users: null,
	userProfile: null,
	avatars: null,
	announcements: null,
	loading: false,
	error: null,
};

export const getAdmin = createAsyncThunk(
	'admin/getAdmin',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.get('/api/users/admin');
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const addUser = createAsyncThunk(
	'admin/addUser',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.post(
				'/api/users',
				payload,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const deleteUser = createAsyncThunk(
	'admin/deleteUser',
	async (payload, thunkAPI) => {
		try {
			if (payload.id === thunkAPI.getState().auth.user._id) {
				return thunkAPI.rejectWithValue({
					message: 'You cannot delete yourself',
				});
			}
			if (payload.newInstructor) {
				const { data: response } = await axios.delete(
					`/api/users/${payload.id}?newInstructor=${payload.newInstructor}`,
				);
				return response.data;
			} else {
				const { data: response } = await axios.delete(
					`/api/users/${payload.id}`,
				);
				return response.data;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const addCategory = createAsyncThunk(
	'admin/addCategory',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.post(
				'/api/categories',
				payload,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const editCategory = createAsyncThunk(
	'admin/editCategory',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.put(
				`/api/categories/${payload.id}`,
				payload,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const deleteCategory = createAsyncThunk(
	'admin/deleteCategory',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.delete(
				`/api/categories/${payload}`,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const addAvatar = createAsyncThunk(
	'admin/addAvatar',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.post(
				'/api/avatars',
				payload,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const deleteAvatar = createAsyncThunk(
	'admin/deleteAvatar',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.delete(
				`/api/avatars/${payload}`,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const setDefaultAvatar = createAsyncThunk(
	'admin/setDefaultAvatar',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.post(
				`/api/avatars/default`,
				payload,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const updateAnnouncement = createAsyncThunk(
	'admin/updateAnnouncement',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.post(
				'/api/announcements/',
				payload,
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const adminSlice = createSlice({
	name: 'admin',
	initialState: initialSate,
	reducers: {
		setUserProfile: (state, action) => {
			state.userProfile = action.payload;
		},
		addEnrollment: (state, action) => {
			state.userProfile.enrollments.push(action.payload);
		},
		deleteEnrollment: (state, action) => {
			state.userProfile.enrollments =
				state.userProfile.enrollments.filter(
					(enrollment) => enrollment._id !== action.payload,
				);
		},
		setCourses: (state, action) => {
			state.courses = action.payload;
		},
		addCourse: (state, action) => {
			state.courses.unshift(action.payload);
		},
		editCourse: (state, action) => {
			const index = state.courses.findIndex(
				(course) => course._id === action.payload._id,
			);
			state.courses[index] = action.payload;
		},
		removeCourse: (state, action) => {
			state.courses = state.courses.filter(
				(course) => course._id !== action.payload,
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAdmin.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAdmin.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload.courses;
				state.categories = action.payload.categories;
				state.users = action.payload.users;
				state.avatars = action.payload.avatars;
				state.announcements = action.payload.announcements;
			})
			.addCase(getAdmin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(addUser.fulfilled, (state, action) => {
				state.loading = false;
				state.users.push(action.payload);
			})
			.addCase(addUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false;
				state.users = state.users.filter(
					(user) => user._id !== action.payload,
				);
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(addCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories.push(action.payload);
			})
			.addCase(addCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = state.categories.filter(
					(category) => category._id !== action.payload,
				);
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(editCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = state.categories.map((category) =>
					category._id === action.payload._id
						? action.payload
						: category,
				);
			})
			.addCase(editCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addAvatar.pending, (state) => {
				state.loading = true;
			})
			.addCase(addAvatar.fulfilled, (state, action) => {
				state.loading = false;
				state.avatars.unshift(action.payload);
			})
			.addCase(addAvatar.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteAvatar.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteAvatar.fulfilled, (state, action) => {
				state.loading = false;
				state.avatars = state.avatars.filter(
					(avatar) => avatar._id !== action.payload,
				);
			})
			.addCase(deleteAvatar.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(setDefaultAvatar.pending, (state) => {
				state.loading = true;
			})
			.addCase(setDefaultAvatar.fulfilled, (state, action) => {
				state.loading = false;
				state.avatars = state.avatars.map((avatar) =>
					avatar._id === action.payload._id ? action.payload : avatar,
				);
			})
			.addCase(setDefaultAvatar.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateAnnouncement.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateAnnouncement.fulfilled, (state, action) => {
				state.loading = false;
				state.announcements = action.payload;
			})
			.addCase(updateAnnouncement.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {
	setUserProfile,
	addEnrollment,
	deleteEnrollment,
	setCourses,
	addCourse,
	removeCourse,
	editCourse,
} = adminSlice.actions;

export default adminSlice.reducer;
