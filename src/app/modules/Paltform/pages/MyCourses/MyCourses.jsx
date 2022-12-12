/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import { Course } from './components';

const MyCourses = () => {
	const { enrollments } = useSelector((state) => state.student);

	console.log(enrollments);

	return (
		<div className='w-full'>
			<Header title={'Mis Cursos'} />
			<div className='grid md:grid-cols-2 lg:grid-cols-4'>
				{enrollments &&
					enrollments.map((enrollment) => (
						<Course course={enrollment.course} />
					))}
			</div>
		</div>
	);
};

export default MyCourses;
