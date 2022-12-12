/** @format */

import { CourseCard } from '@/app/modules/General/components/CourseCard';
import { Title } from '@/app/modules/General/components/Title';
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCourses = ({courses}) => {
	return (
		<section className='section bg-light-background-primary dark:bg-dark-background-primary'>
			<div className='container'>
				<Title title='Cursos Destacados' />
				<div className='grid md:grid-cols-2 lg:grid-cols-4 mb-10'>
					{courses.map((course) => (
						<CourseCard key={course._id} course={course} />
					))}
				</div>
				<Link
					to='/courses'
					className='block w-full max-w-xs text-center mx-auto text-heading-6 px-6 border-2 py-4 rounded-full duration-300 border-transparent dark:border-white bg-primary/10 dark:bg-transparent text-primary dark:text-white hover:border-primary hover:bg-primary hover:dark:bg-white hover:text-white hover:dark:text-dark-background-primary'>
					Ver todo los cursos
				</Link>
			</div>
		</section>
	);
};

export default FeaturedCourses;
