/** @format */

import axios from 'axios';

export const fetchAvatars = async () => {
	try {
		const { data: response } = await axios.get('http://localhost:5000/api/avatars');
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
