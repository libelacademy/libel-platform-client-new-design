/** @format */

import axios from 'axios';

export const forgotPassword = (email) => {
	return axios.post('/api/auth/forgot-password', { email });
};
