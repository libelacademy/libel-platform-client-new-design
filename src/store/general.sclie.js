/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	theme: 'light',
	announcement: {
		visible: false,
		message: '',
		url: '',
	},
	videoModal: {
		show: false,
		url: '',
	},
};

export const getAnnouncement = createAsyncThunk(
	'general/getAnnouncement',
	async (payload, thunkAPI) => {
		try {
			const { data: response } = await axios.get(
				'/api/announcements/latest',
			);
			if (response.data) {
				
				return response.data;
			} else {
				return {
					visible: false,
					message: '',
					url: '',
				};
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

export const generalSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
			document.body.classList.remove('dark');
			document.body.classList.remove('light');
			document.body.classList.add(state.theme);
		},
		toggleAnnouncement: (state) => {
			state.announcement.visible = !state.announcement.visible;
		},
		setAnnouncement: (state, action) => {
			state.announcement = action.payload;
		},
		openVideoModal: (state, actions) => {
			state.videoModal.show = true;
			state.videoModal.url = actions.payload;
		},
		closeVideoModal: (state) => {
			state.videoModal.show = false;
			state.videoModal.url = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAnnouncement.fulfilled, (state, action) => {
				state.announcement = action.payload;
			})
			.addCase(getAnnouncement.rejected, (state) => {
				state.announcement = {
					visible: false,
					message: '',
					url: '',
				};
			});
	}
});

export const {
	toggleTheme,
	toggleAnnouncement,
	setAnnouncement,
	openVideoModal,
	closeVideoModal,
} = generalSlice.actions;

export default generalSlice.reducer;
