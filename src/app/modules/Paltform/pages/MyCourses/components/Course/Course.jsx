/** @format */

import { classnames } from '@/app/shared/utils';
import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => {
	return (
		<div className='w-full px-[15px]'>
			<div className='group transition-all duration-300 shadow-item hover:shadow-item-hover p-5 overflow-hidden rounded-lg mb-5 bg-light-background-primary dark:bg-dark-background-secondary hover:transform hover:-translate-y-[10px]'>
				<figure className='relative w-full aspect-square mb-5 overflow-hidden rounded-lg bg-dark-secondary dark:bg-light-secondary'>
					<img
						src={course.image.url}
						alt={course.title}
						className='w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500'
					/>
				</figure>
				<div className='flex items-center justify-between mb-2'>
					<h4 className='text-body font-bold text-light-onSurface dark:text-dark-onSurface duration-300 hover:text-primary hover:dark:text-primary'>
						{course.title}
					</h4>
					{course.private && (
						<RiLockFill
							className='text-light-secondary dark:text-white-2'
							size={20}
						/>
					)}
				</div>
				<div className='w-full flex items-center justify-between mb-4 text-light-secondary dark:text-white-2'>
					<span>{course.category.name}</span>
					<span
						className={classnames(
							'text-sm px-2 py-1 text-white rounded-md capitalize',
							course.level === 'principiante'
								? 'bg-done'
								: course.level === 'intermedio'
								? 'bg-warning'
								: 'bg-critical',
						)}
					>
						{course.level}
					</span>
				</div>
				<div className='w-full flex items-center justify-between mb-5'>
					<div className='flex items-center '>
						<figure className='bg-[#C4C4C4] h-11 w-11 rounded-lg shadow-avatar overflow-hidden mr-3'>
							<img
								src={course.instructor?.avatar.url}
								alt={course.instructor?.name}
								className='w-full object-cover'
							/>
						</figure>
						<div className='flex flex-col text-left'>
							<span className='text-light-secondary dark:text-white-2 text-caption-2'>
								Instructor
							</span>
							<span className='text-light-onSurface dark:text-dark-onSurface text-button'>
								{course.instructor?.name}
							</span>
						</div>
					</div>
				</div>
				<Link
					to={`/courses/${course.slug}`}
					className='block w-full px-4 py-2 bg-primary text-white rounded-md text-button text-center'
				>
					Ir al curso
				</Link>
			</div>
		</div>
	);
};

export default Course;
