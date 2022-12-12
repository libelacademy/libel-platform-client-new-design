/** @format */

import axios from 'axios';

export const uploadFile = async (file) => {
	try {
		const formData = new FormData();
		formData.append('file', file);
		const {data: response} = await axios.post('/api/files', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		return null;
	}
};
