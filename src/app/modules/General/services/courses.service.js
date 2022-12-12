/** @format */

import axios from 'axios';

// import { axiosIntance } from "@/app/app.component";

export const fetchCourses = async (query) => {
	let result = [];
	try {
		if (query) {
			const { data: response } = await axios.get(
				'http://localhost:5000/api/courses?category=' + query,
			);
			result = response.data;
		} else {
			const { data: response } = await axios.get(
				'http://localhost:5000/api/courses',
			);
			result = response.data;
		}
		return result;
	} catch (error) {
		return error.response.data;
	}
};

export const fetchCourse = async (slug) => {
	try {
		const { data: response } = await axios.get(
			'http://localhost:5000/api/courses/slug/' + slug,
		);
		return response.data;
	} catch (error) {
		const fecthError = new Error();
		fecthError.message = error.response.data.message;
		fecthError.status = error.response.status;
		throw fecthError;
	}
};
