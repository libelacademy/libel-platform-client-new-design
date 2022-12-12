/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Admin, Instructor, Student } from './components';

const Dashboard = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div className='w-full'>
			<Header dashboard />
			{user?.role === 'admin' && <Admin />}
			{user?.role === 'instructor' && <Instructor />}
			{user?.role === 'student' && <Student />}
		</div>
	);
};

export default Dashboard;
