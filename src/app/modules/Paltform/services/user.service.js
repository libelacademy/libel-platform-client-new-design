/** @format */

import axios from 'axios';

export const changePassword = async (data) => {
	try {
		const { data: response } = await axios.put(
			'http://localhost:5000/api/users/me/password',
			data,
		);
		return response;
	} catch (error) {
		return error.response.data;
	}
};

export const deleteUser = async () => {
	try {
		const { data: response } = await axios.delete(
			'http://localhost:5000/api/users/me',
		);
		return response;
	} catch (error) {
		return error.response.data;
	}
};

export const getUserProfile = async (id) => {
	try {
		const { data: response } = await axios.get(
			`http://localhost:5000/api/users/profile/${id}`,
			{
				withCredentials: true,
			},
		);
		return response;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export const getInstructors = async () => {
	try {
		const { data: response } = await axios.get(
			'http://localhost:5000/api/users/instructors',
			{
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		return []
	}
}