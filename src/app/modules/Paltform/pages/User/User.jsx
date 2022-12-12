/** @format */

import { classnames, countries } from '@/app/shared/utils';
import { setUserProfile } from '@/store/admin.slice';
import { useEffect, useState } from 'react';
import {
	RiBookOpenLine,
	RiDeleteBin6Fill,
	RiFeedbackLine,
	RiFileTextLine,
	RiFolder3Line,
	RiHeart3Line,
	RiUser3Line,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { Header } from '../../components';
import { getUserProfile } from '../../services';
import { ConfirmDeleteEnrollment, EnrollCourse } from './components';

export const loader = async ({ params }) => {
	const { id } = params;
	const { data } = await getUserProfile(id);
	return data;
};

const User = () => {
	const profile = useLoaderData();
	const { id } = useParams();
	const { users, userProfile, courses } = useSelector(
		(state) => state.admin,
	);
	const [user, setUser] = useState({});
	const [isModalEnrollOpen, setIsModalEnrollOpen] = useState(false);
	const [
		isModalDeleteEnrollmentOpen,
		setIsModalDeleteEnrollmentOpen,
	] = useState(false);
	const [selectedEnrollment, setSelectedEnrollment] = useState({});
	const dispath = useDispatch();

	const handleDeleteEnrollment = (enrollment, course) => {
		setSelectedEnrollment({ enrollment, course });
		setIsModalDeleteEnrollmentOpen(true);
	};

	useEffect(() => {
		if (users) {
			const user = users?.find((user) => user._id === id);
			if (user) {
				setUser(user);
				dispath(setUserProfile(profile));
			} else {
				throw new Error('User not found');
			}
		}
	}, [id, users]);

	return (
		<div className='w-full flex-grow pb-7'>
			{user ? (
				<>
					{user.role === 'student' && (
						<>
							<EnrollCourse
								isOpen={isModalEnrollOpen}
								closeModal={() => setIsModalEnrollOpen(false)}
								student={user._id}
								courses={courses?.filter((course) => {
									const isEnrolled = userProfile?.enrollments?.find(
										(enroll) => {
											return enroll.course._id === course._id;
										},
									);
									return !isEnrolled && course.status !== 'draft';
								})}
							/>
							<ConfirmDeleteEnrollment
								isOpen={isModalDeleteEnrollmentOpen}
								closeModal={() =>
									setIsModalDeleteEnrollmentOpen(false)
								}
								enrollment={selectedEnrollment.enrollment}
								course={selectedEnrollment.course}
							/>
						</>
					)}
					<Header
						title={user.name}
						predecessor={{
							url: '/platform/users',
							label: 'Usuarios',
						}}
					/>
					<div className='w-full flex flex-col lg:flex-row  gap-5'>
						<div className='w-full lg:w-full lg:max-w-md flex flex-col gap-5'>
							<div className='relative w-full flex flex-col lg:flex-row lg:gap-5 items-center bg-white p-4 rounded-lg shadow'>
								<figure className='w-32 h-32 rounded-2xl overflow-hidden mb-3 lg:mb-0'>
									<img
										src={user.avatar?.url}
										alt={user.name}
										className='h-full object-cover'
									/>
								</figure>
								<div className=' flex flex-col justify-center items-center text-center lg:text-left lg:items-start'>
									<div>
										<h3 className='text-heading-5 leading-none text-gray-800'>
											{user.name}
										</h3>
										<p className='text-sub-title text-gray-600'>
											{user.email}
										</p>
									</div>
									<span className=' px-2 py-0.5 text-button bg-slate-100 text-slate-700 rounded-md lg:mt-2'>
										{user.role === 'admin'
											? 'Administrador'
											: user.role === 'instructor'
											? 'Instructor'
											: 'Estudiante'}
									</span>
								</div>
							</div>
							<div className='relative w-full bg-white rounded-lg shadow'>
								<header className='w-full p-4 border-b '>
									<h2 className='text-heading-6'>
										Información General
									</h2>
								</header>
								<div className='w-full flex flex-col gap-2 py-4 px-6'>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Nombre
										</p>
										<p className='text-body-3 text-gray-400'>
											{user.name}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Usuario
										</p>
										<p className='text-body-3 text-gray-400'>
											@{user.username}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Email
										</p>
										<p className='text-body-3 text-gray-400'>
											{user.email}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Rol
										</p>
										<p className='text-body-3 text-gray-400'>
											{user.role === 'admin'
												? 'Administrador'
												: user.role === 'instructor'
												? 'Instructor'
												: 'Estudiante'}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											País
										</p>
										<p className='text-body-3 text-gray-400'>
											{
												countries.find(
													(country) => country.code === user.country,
												)?.name
											}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Teléfono
										</p>
										<p className='text-body-3 text-gray-400'>
											{
												countries.find(
													(country) => country.code === user.country,
												)?.dial_code
											}
											{user.phone}
										</p>
									</div>
								</div>
							</div>
							<div className='relative w-full bg-white rounded-lg shadow'>
								<header className='w-full p-4 border-b '>
									<h2 className='text-heading-6'>Redes Sociales</h2>
								</header>
								<div className='w-full flex flex-col gap-2 py-4 px-6'>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Facebook
										</p>
										<p className='text-body-3 text-gray-400'>
											{user.social?.facebook
												? user.social?.facebook
														.split('https://facebook.com/')
														.pop()
												: '--'}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Instagram
										</p>
										<p className='text-body-3 text-gray-400'>
											{user?.social?.instagram
												? user?.social?.instagram
														.split('https://www.instagram.com/')
														.pop()
												: '--'}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											Twitter
										</p>
										<p className='text-body-3 text-gray-400'>
											{user?.social?.twitter
												? user?.social?.twitter
														.split('https://www.twitter.com/')
														.pop()
												: '--'}
										</p>
									</div>
									<div className='flex justify-between'>
										<p className='text-body-3 font-bold text-gray-800'>
											LinkedIn
										</p>
										<p className='text-body-3 text-gray-400'>
											{user?.social?.linkedin
												? user?.social?.linkedin
														.split('https://www.linkedin.com/in/')
														.pop()
												: '--'}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='w-full lg:max-w-2xl flex flex-col gap-5'>
							{user.role === 'student' && (
								<>
									<div className='relative w-full bg-white rounded-lg overflow-hidden shadow'>
										<header className='w-full p-4 border-b flex items-center justify-between'>
											<h2 className='text-heading-6'>
												Cursos Matriculados
											</h2>
											<button
												onClick={() => setIsModalEnrollOpen(true)}
												className='ml-auto rounded-lg px-2 py-1 md:py-2 md:px-3 text-caption font-bold md:text-button text-primary bg-primary/10 hover:bg-primary/30 flex items-center justify-center'>
												Matricular Curso
											</button>
										</header>
										<div className='w-full'>
											{userProfile.enrollments.length > 0 ? (
												<>
													<div className='md:hidden w-full text-sm text-left text-gray-500'>
														{[...userProfile.enrollments]
															.sort((a, b) =>
																new Date(a.createdAt).getTime() <
																new Date(b.createdAt).getTime()
																	? 1
																	: -1,
															)
															.map((enrollment) => (
																<div
																	key={enrollment._id}
																	className='w-full p-4 border-b last:border-b-0 flex items-center justify-between'>
																	<div className='flex items-center'>
																		<figure className='w-10 h-10 rounded overflow-hidden bg-primary/70 mr-3'>
																			<img
																				src={
																					enrollment.course?.image.url
																				}
																				alt={user.name}
																				className='h-full w-full object-cover'
																			/>
																		</figure>
																		<div>
																			<p className='text-body-3 leading-none font-bold text-gray-800'>
																				{enrollment.course.title}
																			</p>
																			<p className='text-caption leading-none text-gray-600'>
																				{
																					enrollment.course
																						?.instructor?.name
																				}
																			</p>
																		</div>
																	</div>
																	<button
																		onClick={() =>
																			handleDeleteEnrollment(
																				enrollment._id,
																				enrollment.course.title,
																			)
																		}
																		disabled={enrollment.expired}>
																		<RiDeleteBin6Fill
																			size={18}
																			className={classnames(
																				'text-red-600',
																				enrollment.expired
																					? 'invisible'
																					: 'cursor-pointer',
																			)}
																		/>
																	</button>
																</div>
															))}
													</div>
													<table className='hidden md:table w-full text-sm text-left text-gray-500'>
														<tbody>
															{[...userProfile.enrollments]
																.sort((a, b) =>
																	new Date(a.createdAt).getTime() <
																	new Date(b.createdAt).getTime()
																		? 1
																		: -1,
																)
																.map((enrollment) => (
																	<tr
																		key={enrollment._id}
																		className='bg-white border-b last:border-b-0'>
																		<td className='py-3 px-4 flex items-center whitespace-nowrap'>
																			<figure className='w-10 h-10 rounded overflow-hidden bg-primary/70 mr-3'>
																				<img
																					src={
																						enrollment.course?.image
																							.url
																					}
																					alt={user.name}
																					className='h-full w-full object-cover'
																				/>
																			</figure>
																			<div>
																				<p className='text-body-3 leading-none font-bold text-gray-800'>
																					{enrollment.course.title}
																				</p>
																				<p className='text-caption leading-none text-gray-600'>
																					{
																						enrollment.course
																							?.instructor?.name
																					}
																				</p>
																			</div>
																		</td>
																		<td className='py-3 px-4 text-center'>
																			<span className='text-caption font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md'>
																				{
																					enrollment.course?.category
																						?.name
																				}
																			</span>
																		</td>
																		<td className='py-3 px-4 text-center'>
																			<span className='text-caption font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-md'>
																				{!enrollment.expired
																					? new Date(
																							enrollment.expiredAt,
																					  ).toLocaleDateString()
																					: '----'}
																			</span>
																		</td>
																		<td className='py-3 px-4 text-cener'>
																			<button
																				onClick={() =>
																					handleDeleteEnrollment(
																						enrollment._id,
																						enrollment.course.title,
																					)
																				}
																				disabled={enrollment.expired}>
																				<RiDeleteBin6Fill
																					size={18}
																					className={classnames(
																						'text-red-600',
																						enrollment.expired
																							? 'invisible'
																							: 'cursor-pointer',
																					)}
																				/>
																			</button>
																		</td>
																	</tr>
																))}
														</tbody>
													</table>
												</>
											) : (
												<div className='w-full flex flex-col items-center justify-center py-8'>
													<RiBookOpenLine
														size={48}
														className='text-gray-400'
													/>
													<p className='text-body-3 text-gray-400 mt-4'>
														No hay cursos matriculados
													</p>
												</div>
											)}
										</div>
									</div>
									<div className='relative w-full bg-white rounded-lg overflow-hidden shadow'>
										<header className='w-full p-4 border-b '>
											<h2 className='text-heading-6'>Likes</h2>
										</header>
										<div className='w-full'>
											{userProfile.likes.length > 0 ? (
												<table className='w-full text-sm text-left text-gray-500'>
													<tbody>
														{[...userProfile.likes]
															.sort((a, b) =>
																new Date(a.createdAt).getTime() <
																new Date(b.createdAt).getTime()
																	? 1
																	: -1,
															)
															.map((like) => (
																<tr
																	key={like._id}
																	className='bg-white border-b last:border-b-0'>
																	<td className='py-3 px-4 flex items-center whitespace-nowrap'>
																		<figure className='w-10 h-10 rounded overflow-hidden bg-primary/70 mr-3'>
																			<img
																				src={like.course?.image.url}
																				alt={user.name}
																				className='h-full w-full object-cover'
																			/>
																		</figure>
																		<div>
																			<p className='text-body-3 leading-none font-bold text-gray-800'>
																				{like.course.title}
																			</p>
																			<p className='text-caption leading-none text-gray-600'>
																				{
																					like.course?.instructor
																						?.name
																				}
																			</p>
																		</div>
																	</td>
																	<td className='py-3 px-4 text-center'>
																		<span className='text-caption font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md'>
																			{like.course.category.name}
																		</span>
																	</td>
																	<td className='hidden md:table-cell py-3 px-4 text-center'>
																		<span className='text-caption font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md'>
																			{new Date(
																				like.createdAt,
																			).toLocaleDateString()}
																		</span>
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											) : (
												<div className='w-full flex flex-col items-center justify-center py-8'>
													<RiHeart3Line
														size={48}
														className='text-gray-400'
													/>
													<p className='text-body-3 text-gray-400 mt-4'>
														No se ha agregado ningún like
													</p>
												</div>
											)}
										</div>
									</div>
								</>
							)}
							{user.role === 'instructor' && (
								<>
									<div className='relative w-full bg-white rounded-lg overflow-hidden shadow'>
										<header className='w-full p-4 border-b flex itmes-center justify-between'>
											<h2 className='text-heading-6'>Cursos</h2>
											<span className='text-caption font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-md'>
												{userProfile.courses.length}
											</span>
										</header>
										<div className='w-full'>
											{userProfile.courses.length > 0 ? (
												<>
													<div className='md:hidden w-full text-sm text-left text-gray-500'>
														{[...userProfile.courses]
															.sort((a, b) =>
																new Date(a.createdAt).getTime() <
																new Date(b.createdAt).getTime()
																	? 1
																	: -1,
															)
															.map((course) => (
																<div
																	key={course._id}
																	className='w-full flex items-center p-4 border-b last:boder-b-0'>
																	<figure className='w-16 h-16 rounded overflow-hidden bg-primary/70 mr-3'>
																		<img
																			src={course?.image}
																			alt={user?.name}
																			className='h-full w-full object-cover'
																		/>
																	</figure>
																	<div className='flex flex-col'>
																		<p className='text-body-3 leading-none font-bold text-gray-800'>
																			{course.title}
																		</p>
																		<p className='text-caption leading-tight'>
																			{course.category?.name}
																		</p>
																		<div className='mt-2 space-x-3'>
																			<span className='text-caption-2 font-bold bg-primary/10 text-primary px-2 py-1 rounded-md'>
																				Est:{' '}
																				<span className='font-normal'>
																					{course.students}
																				</span>
																			</span>
																			<span className='text-caption-2 font-bold bg-pink-100 text-pink-700 px-2 py-1 rounded-md'>
																				Likes:{' '}
																				<span className='font-normal'>
																					{course.likes}
																				</span>
																			</span>
																			<span className='text-caption-2 font-bold bg-pink-100 text-pink-700 px-2 py-1 rounded-md'>
																				Likes:{' '}
																				<span className='font-normal'>
																					{course.level}
																				</span>
																			</span>
																			<span
																				className={classnames(
																					'text-caption-2 font-bold px-2 py-1 rounded-md',
																					course.status === 'draft'
																						? 'bg-amber-100 text-amber-700'
																						: course.status ===
																						  'published'
																						? 'bg-green-100 text-green-700'
																						: 'bg-sky-100 text-sky-700',
																				)}>
																				{course.status === 'draft'
																					? 'Borrador'
																					: course.status ===
																					  'published'
																					? 'Publicado'
																					: 'Próximamente'}
																			</span>
																		</div>
																	</div>
																</div>
															))}
													</div>
													<table className='hidden md:table w-full text-sm text-left text-gray-500'>
														<tbody>
															{[...userProfile.courses]
																.sort((a, b) =>
																	new Date(a.createdAt).getTime() <
																	new Date(b.createdAt).getTime()
																		? 1
																		: -1,
																)
																.map((course) => (
																		<tr
																			key={course._id}
																			className='bg-white border-b last:border-b-0'>
																			<td className='py-3 px-4 flex items-center whitespace-nowrap'>
																				<figure className='w-10 h-10 rounded overflow-hidden bg-primary/70 mr-3'>
																					<img
																						src={course?.image}
																						alt={user?.name}
																						className='h-full w-full object-cover'
																					/>
																				</figure>
																				<div>
																					<p className='text-body-3 leading-none font-bold text-gray-800'>
																						{course.title}
																					</p>
																					<p className='text-caption leading-none'>
																						{course.category?.name}
																					</p>
																				</div>
																			</td>
																			<td className='py-3 px-4 '>
																				<span className='inline-flex items-center justify-center text-caption bg-primary/10 text-primary px-2 py-1 rounded-md'>
																					<RiUser3Line className='mr-2' />
																					<span className='font-normal'>
																						{course.students}
																					</span>
																				</span>
																			</td>
																			<td className='py-3 px-1 text-center'>
																				<span className='inline-flex items-center justify-center text-caption bg-pink-100 text-pink-700 px-2 py-1 rounded-md'>
																					<RiHeart3Line className='mr-2' />
																					<span className='font-normal'>
																						{course.likes}
																					</span>
																				</span>
																			</td>
																			<td className='py-3 px-1 text-center'>
																				<span className='text-caption font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded-md'>
																					{course.level}
																				</span>
																			</td>
																			<td className='py-3 px-4'>
																				<span
																					className={classnames(
																						'text-caption font-bold px-2 py-1 rounded-md',
																						course.status === 'draft'
																							? 'bg-amber-100 text-amber-700'
																							: course.status ===
																							  'published'
																							? 'bg-green-100 text-green-700'
																							: 'bg-sky-100 text-sky-700',
																					)}>
																					{course.status === 'draft'
																						? 'Borrador'
																						: course.status ===
																						  'published'
																						? 'Publicado'
																						: 'Próximamente'}
																				</span>
																			</td>
																		</tr>
																))}
														</tbody>
													</table>
												</>
											) : (
												<div className='w-full flex flex-col items-center justify-center py-8'>
													<RiBookOpenLine
														size={48}
														className='text-gray-400'
													/>
													<p className='text-body-3 text-gray-400 mt-4'>
														No hay cursos disponibles
													</p>
												</div>
											)}
										</div>
									</div>
								</>
							)}
							{user.role === 'admin' && (
								<>
									<div className='relative w-full bg-white rounded-lg overflow-hidden shadow'>
										<header className='w-full p-4 border-b flex items-center justify-between'>
											<h2 className='text-heading-6'>
												Cursos Creados
											</h2>
											<span className='text-caption font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-md'>
												{userProfile.courses.length}
											</span>
										</header>
										<div className='w-full'>
											{userProfile.courses.length > 0 ? (
												<>
													<div className='md:hidden w-full text-sm text-left text-gray-500'>
														{[...userProfile.courses]
															.sort((a, b) =>
																new Date(a.createdAt).getTime() <
																new Date(b.createdAt).getTime()
																	? 1
																	: -1,
															)
															.map((course) => (
																<div
																	key={course._id}
																	className=' w-full flex items-center p-4 border-b last:boder-b-0'>
																	<figure className='w-16 h-16 rounded overflow-hidden bg-primary/70 mr-3'>
																		<img
																			src={course?.image}
																			alt={user?.name}
																			className='h-full w-full object-cover'
																		/>
																	</figure>
																	<div className='flex flex-col'>
																		<p className='text-body-3 leading-none font-bold text-gray-800'>
																			{course.title}
																		</p>
																		<p className='text-caption leading-tight'>
																			{course.instructor?.name}
																		</p>
																		<div className='mt-2 space-x-3'>
																			<span className='text-caption-2 font-bold bg-primary/10 text-primary px-2 py-1 rounded-md'>
																				{course.category?.name}
																			</span>
																			<span className='text-caption-2 font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded-md'>
																					{course.level}
																				</span>
																			<span
																				className={classnames(
																					'text-caption-2 font-bold px-2 py-1 rounded-md',
																					course.status === 'draft'
																						? 'bg-amber-100 text-amber-700'
																						: course.status ===
																						  'published'
																						? 'bg-green-100 text-green-700'
																						: 'bg-sky-100 text-sky-700',
																				)}>
																				{course.status === 'draft'
																					? 'Borrador'
																					: course.status ===
																					  'published'
																					? 'Publicado'
																					: 'Próximamente'}
																			</span>
																		</div>
																	</div>
																</div>
															))}
													</div>
													<table className='hidden md:table w-full text-sm text-left text-gray-500'>
														<tbody>
															{[...userProfile.courses]
																.sort((a, b) =>
																	new Date(a.createdAt).getTime() <
																	new Date(b.createdAt).getTime()
																		? 1
																		: -1,
																)
																.map((course) => (
																	<tr
																		key={course._id}
																		className='bg-white border-b last:border-b-0'>
																		<td className='py-3 px-4 flex items-center'>
																			<figure className='w-10 h-10 rounded overflow-hidden bg-primary/70 mr-3'>
																				<img
																					src={course?.image}
																					alt={user?.name}
																					className='h-full w-full object-cover'
																				/>
																			</figure>
																			<div>
																				<p className='text-body-3 leading-none font-bold text-gray-800'>
																					{course.title}
																				</p>
																				<p className='text-caption leading-none'>
																					{course.instructor.name}
																				</p>
																			</div>
																		</td>
																		<td className='py-3 px-4 '>
																			<span className='text-caption font-bold bg-primary/10 text-primary px-2 py-1 rounded-md'>
																				{course.category.name}
																			</span>
																		</td>
																		<td className='py-3 px-1'>
																				<span className='text-caption font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded-md'>
																					{course.level}
																				</span>
																			</td>
																		<td className='py-3 px-4'>
																			<span
																				className={classnames(
																					'text-caption font-bold px-2 py-1 rounded-md',
																					course.status === 'draft'
																						? 'bg-amber-100 text-amber-700'
																						: course.status ===
																						  'published'
																						? 'bg-green-100 text-green-700'
																						: 'bg-sky-100 text-sky-700',
																				)}>
																				{course.status === 'draft'
																					? 'Borrador'
																					: course.status ===
																					  'published'
																					? 'Publicado'
																					: 'Próximamente'}
																			</span>
																		</td>
																	</tr>
																))}
														</tbody>
													</table>
												</>
											) : (
												<div className='w-full flex flex-col items-center justify-center py-8'>
													<RiBookOpenLine
														size={48}
														className='text-gray-400'
													/>
													<p className='text-body-3 text-gray-400 mt-4'>
														No hay cursos disponibles
													</p>
												</div>
											)}
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</>
			) : (
				<div className='w-full h-full flex items-center justfy-center'>
					<div className='w-80 h-80 mx-auto rounded-full border-[10px] border-primary border-t-primary/10 animate-spin'></div>
				</div>
			)}
		</div>
	);
};

export default User;
