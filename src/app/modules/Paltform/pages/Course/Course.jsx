/** @format */

import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Header } from '../../components';
import {
	getCourseById,
	getCourseBySlug,
	getInstructors,
} from '../../services';
import { classnames } from '@/app/shared/utils';
import { Tab } from '@headlessui/react';
import { Settings, Curriculum } from './pages';
import { getAllCategories } from '../../services/categories.service';
import { useState } from 'react';
import { Publish } from './components';

export const loader = async ({ params }) => {
	const { slug } = params;
	// const course = await getCourseBySlug(slug);
	const course = await getCourseById(slug);
	const instructors = await getInstructors();
	const categories = await getAllCategories();

	if (course) {
		return { course, instructors, categories };
	} else {
		throw new Error('Course not found');
	}
};

const Course = () => {
	const { course: data, instructors, categories } = useLoaderData();
	const [course, setCourse] = useState(data);
	const [showPublish, setShowPublish] = useState(false);
	console.log(course);

	return (
		<div className='w-full'>
			<Publish
				isOpen={showPublish}
				closeModal={() => setShowPublish(false)}
				status={course.status}
				publishedAt={course.publishedAt}
				courseId={course._id}
			/>
			<Header title={course.title} />
			<Tab.Group>
				<div className='w-full flex flex-col lg:flex-row items-start gap-10'>
					<div className='w-full lg:max-w-xs'>
						<button
							onClick={() => setShowPublish(true)}
							className='group w-full font-bold text-body transition-all duration-300 shadow-item px-5 py-3 text-center overflow-hidden rounded-lg mb-5 bg-primary text-white'
						>
							Publicar
						</button>
						<div className='group transition-all duration-300 shadow-item p-5 overflow-hidden rounded-lg mb-5 bg-light-background-primary'>
							<figure className='relative w-full aspect-square mb-3 overflow-hidden rounded-lg bg-dark-secondary'>
								{course.image && (
									<img
										src={course.image}
										alt={course.title}
										className='h-full w-full object-cover'
									/>
								)}
								<div className='absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md w-1/2 px-2 py-1 text-center font-bold'>
									{course.status === 'published' && 'Publicado'}
									{course.status === 'pre-order' && 'Próximo'}
									{course.status === 'draft' && 'Borrador'}
								</div>
							</figure>
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
							<div className='flex items-center '>
								<figure className='bg-[#C4C4C4] h-11 w-11 rounded-lg shadow-avatar overflow-hidden mr-3'>
									<img
										src={course.instructor?.avatar}
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
						<div className='w-full flex flex-col'>
							<button className='group transition-all duration-300 shadow-item px-5 py-3 overflow-hidden rounded-lg mb-5 bg-light-background-primary hover:bg-primary/30 hover:text-primary'>
								<h3 className='font-bold text-body'>Configuración</h3>
							</button>
							{/* <Tab className='group transition-all duration-300 shadow-item px-5 py-3 overflow-hidden rounded-lg mb-5 bg-light-background-primary hover:bg-primary/30 hover:text-primary'>
								<h3 className='font-bold text-body'>Curriculum</h3>
							</Tab> */}
						</div>
					</div>
					<div className='w-full'>
						<Settings
							course={course}
							instructors={instructors}
							categories={categories}
							setCourse={setCourse}
						/>
					</div>
				</div>
			</Tab.Group>
		</div>
	);
};

export default Course;
