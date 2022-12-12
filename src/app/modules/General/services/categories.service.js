/** @format */

// import { axiosIntance } from "@/app/app.component";
import axios from 'axios';

export const fetchCategories = async () => {
	try {
		const { data: response } = await axios.get(
			'http://localhost:5000/api/categories',
		);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
