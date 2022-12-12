/** @format */

import { removeCourse } from '@/store/admin.slice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const getAllCourses = async () => {
	try {
		const { data: resposne } = await axios.get(
			'http://localhost:5000/api/courses/all',
			{
				withCredentials: true,
			},
		);
		return resposne.data;
	} catch (error) {
		return null;
	}
};


export const getCourse = async (id) => {
	try {
		const { data: response } = await axios.get(
			`http://localhost:5000/api/courses/${id}`,
			{
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		return null;
	}
}

export const getCourseById = async (id) => {
	try {
		const { data: response } = await axios.get(
			`http://localhost:5000/api/courses/id/${id}`,
			{
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		return null;
	}
}

export const getCourseBySlug = async (slug) => {
	try {
		const { data: response } = await axios.get(
			`http://localhost:5000/api/courses/slug/${slug}`,
			{
				withCredentials: true,
			},
		);
		return response.data;
	} catch (error) {
		return null;
	}
}

export const createCourse = async (course ) => {
	try {
		const { data: response } = await axios.post(
			'http://localhost:5000/api/courses',
			course,
			{
				withCredentials: true,
			},
		);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

export const updateCourse = async ({id, course}) => {
	try {
		const { data: response } = await axios.put(
			`http://localhost:5000/api/courses/${id}`,
			course,
			{
				withCredentials: true,
			},
		);
		return response;
	} catch (error) {
		return error.response.data;
	}
}

export const deleteCourse = async (id) => {
	try {
		const { data: response } = await axios.delete(
			`http://localhost:5000/api/courses/${id}`,
			{
				withCredentials: true,
			},
		);
		return response;
	} catch (error) {
		return error.response.data;
	}
}