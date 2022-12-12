/** @format */

import { setCourses } from '@/store/admin.slice';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RiBook2Line, RiUserAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Header } from '../../components';
import { getAllCategories, getAllCourses, getInstructors } from '../../services';
import { Course, DeleteCourse } from './components';
import { CreateCourse } from './components/CreateCourse';

export const loader = async () => {
	const courses = await getAllCourses();
	const instructors = await getInstructors();
	const categories = await getAllCategories();
	return { courses, instructors, categories };
};

const Courses = () => {
	const { courses, instructors, categories } = useLoaderData();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const { courses: coursesList } = useSelector(
		(state) => state.admin,
	);
	const [courseToDelete, setCourseToDelete] = useState(null);
	const [isDeleteCourseOpen, setIsDeleteCourseOpen] = useState(false);
	const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

	const handleDeleteCourse = (course) => {
		console.log(course);
		setCourseToDelete(course);
		setIsDeleteCourseOpen(true);
	};

	useEffect(() => {
		dispatch(setCourses(courses));
	}, [courses]);

	return (
		<div className='w-full'>
			<DeleteCourse
				isOpen={isDeleteCourseOpen}
				closeModal={() => setIsDeleteCourseOpen(false)}
				course={courseToDelete}
			/>
			<CreateCourse
				isOpen={isCreateCourseOpen}
				closeModal={() => setIsCreateCourseOpen(false)}
				instructors={instructors}
				categories={categories}
				instructor={user.role === "instructor" ? user : null }
			/>
			<Header title={'Cursos'} />
			<div className='flex flex-col lg:flex-row items-center justify-center w-full mb-5'>
				<button
					onClick={() => setIsCreateCourseOpen(true)}
					className='w-full shadow md:w-auto ml-auto rounded-lg py-2 px-3 text-button text-primary bg-primary/10 hover:bg-primary/30 flex items-center justify-center'
				>
					<RiBook2Line size={20} className='mr-3' />
					Añadir Curso
				</button>
			</div>
			<div className='w-full flex flex-nowrap'>
				{coursesList &&
					coursesList.map((course) => (
						<Course
							key={course._id}
							course={course}
							deleteCourse={handleDeleteCourse}
						/>
					))}
			</div>
		</div>
	);
};

export default Courses;
