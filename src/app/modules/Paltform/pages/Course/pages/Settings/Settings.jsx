/** @format */

import {
	updateCourse,
	uploadFile,
} from '@/app/modules/Paltform/services';
import { Listbox, Switch, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiCheckLine, RiCodeSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const levels = [
	{
		_id: 0,
		name: 'Principiante',
		value: 'principiante',
	},
	{
		_id: 1,
		name: 'Intermedio',
		value: 'intermedio',
	},
	{
		_id: 2,
		name: 'Avanzado',
		value: 'avanzado',
	},
];

const Settings = ({ course, instructors, categories, setCourse }) => {
	const { user } = useSelector((state) => state.auth);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title: course.title,
			description: course.description,
			timeToAccess: course.timeToAccess,
			price: course.price,
			discount: course.discount,
			trailer: course.trailer,
		},
	});
	

	const [instructorSelected, setInstructorSelected] = useState(
		user.role === 'admin'
			? instructors.find(
					(instructor) => instructor._id === course.instructor._id,
			  )
			: course.instructor,
	);
	const [categorySelected, setCategorySelected] = useState(
		categories.find(
			(category) => category._id === course.category._id,
		),
	);
	const [levelSelected, setLevelSelected] = useState(
		levels.find((level) => level.value === course.level),
	);
	const [isCerticated, setIsCerticated] = useState(
		course.withCertificate,
	);
	const [isWithFeedback, setIsWithFeedback] = useState(
		course.withFeedback,
	);
	const [isOnline, setIsOnline] = useState(course.isOnline);
	const [isHidden, setIsHidden] = useState(course.hidden);
	const [isPrivate, setIsPrivate] = useState(course.private);

	const onSubmit = async (data) => {
		const { image, ...updatedCourse } = data;
		if (!!image[0]) {
			const file = await uploadFile(image[0]);
			if (file) {
				console.log(file);
				updatedCourse.image = file._id;
			}
		}
		updatedCourse.instructor = instructorSelected._id;
		updatedCourse.category = categorySelected._id;
		updatedCourse.level = levelSelected.value;
		updatedCourse.withCertificate = isCerticated;
		updatedCourse.withFeedback = isWithFeedback;
		updatedCourse.isOnline = isOnline;
		updatedCourse.hidden = isHidden;
		updatedCourse.private = isPrivate;

		// console.log(updatedCourse);

		const response = await updateCourse({
			id: course._id,
			course: updatedCourse,
		});

		if (response) {
			location.reload();
		}
	};

	return (
		<>
			
			<form
				className='w-full lg:max-w-2xl'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='w-full mb-10 bg-white p-4 shadow rounded-md'>
					<h4 className='text-2xl font-bold mb-5 border-b'>
						Información Básica
					</h4>
					<div className='px-2'>
						<div className=' mb-5'>
							<label htmlFor='title' className='font-bold '>
								Título
							</label>
							<input
								{...register('title')}
								type='text'
								name='title'
								placeholder='Título'
								className='w-full border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
							/>
						</div>
						<div className=' mb-5'>
							<label htmlFor='description' className='font-bold '>
								Description
							</label>
							<textarea
								{...register('description')}
								type='text'
								rows={4}
								name='description'
								placeholder='Descripción'
								className='w-full border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
							/>
						</div>
						{user.role === 'admin' && (
							<div className='mb-5'>
								<span className='font-bold '>Instructor</span>
								<Listbox
									value={instructorSelected}
									onChange={setInstructorSelected}
								>
									<div className='relative mt-2'>
										<Listbox.Button className='relative  w-full flex items-center justify-between cursor-pointer rounded-lg bg-white py-2 px-4 text-left border border-dark-secondary  text-white-2 focus:outline-none'>
											<span className='block truncate'>
												{instructorSelected.name}
											</span>
											<RiCodeSLine size={16} className='rotate-90' />
										</Listbox.Button>
										<Transition
											as={Fragment}
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<Listbox.Options className='absolute z-[3] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
												{instructors.map((instructor) => (
													<Listbox.Option
														key={instructor._id}
														className={({ active }) =>
															`relative cursor-default select-none py-2 pl-10 pr-4 ${
																active
																	? 'bg-primary/10 text-primary'
																	: 'text-gray-900'
															}`
														}
														value={instructor}
													>
														{({ selected, active }) => (
															<>
																<span
																	className={`${
																		selected
																			? 'font-medium'
																			: 'font-normal'
																	} block truncate`}
																>
																	{instructor.name}
																</span>
																{selected ? (
																	<span
																		className={`${
																			active
																				? 'text-white'
																				: 'text-primary'
																		} absolute inset-y-0 left-0 flex items-center pl-3`}
																	>
																		<RiCheckLine size={16} />
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</div>
						)}
						<div className='mb-5'>
							<span className='font-bold '>Categoría</span>
							<Listbox
								value={categorySelected}
								onChange={setCategorySelected}
							>
								<div className='relative mt-2'>
									<Listbox.Button className='relative w-full flex items-center justify-between cursor-pointer rounded-lg bg-white py-2 px-4 text-left border border-dark-secondary  text-white-2 focus:outline-none'>
										<span className='block truncate'>
											{categorySelected.name}
										</span>
										<RiCodeSLine size={16} className='rotate-90' />
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave='transition ease-in duration-100'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<Listbox.Options className='absolute z-[3] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
											{categories.map((category) => (
												<Listbox.Option
													key={category._id}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? 'bg-primary/10 text-primary'
																: 'text-gray-900'
														}`
													}
													value={category}
												>
													{({ selected, active }) => (
														<>
															<span
																className={`${
																	selected
																		? 'font-medium'
																		: 'font-normal'
																} block truncate`}
															>
																{category.name}
															</span>
															{selected ? (
																<span
																	className={`${
																		active
																			? 'text-white'
																			: 'text-primary'
																	} absolute inset-y-0 left-0 flex items-center pl-3`}
																>
																	<RiCheckLine size={16} />
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>
						<div className='mb-5'>
							<span className='font-bold '>Nivel</span>
							<Listbox
								value={levelSelected}
								onChange={setLevelSelected}
							>
								<div className='relative mt-2'>
									<Listbox.Button className='relative w-full flex items-center justify-between cursor-pointer rounded-lg bg-white py-2 px-4 text-left border border-dark-secondary  text-white-2 focus:outline-none'>
										<span className='block truncate'>
											{levelSelected.name}
										</span>
										<RiCodeSLine size={16} className='rotate-90' />
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave='transition ease-in duration-100'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<Listbox.Options className='absolute z-[3] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
											{levels.map((level) => (
												<Listbox.Option
													key={level._id}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? 'bg-primary/10 text-primary'
																: 'text-gray-900'
														}`
													}
													value={level}
												>
													{({ selected, active }) => (
														<>
															<span
																className={`${
																	selected
																		? 'font-medium'
																		: 'font-normal'
																} block truncate`}
															>
																{level.name}
															</span>
															{selected ? (
																<span
																	className={`${
																		active
																			? 'text-white'
																			: 'text-primary'
																	} absolute inset-y-0 left-0 flex items-center pl-3`}
																>
																	<RiCheckLine size={16} />
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>
						<div className='mb-5 flex items-center justify-between'>
							<span className='font-bold '>Certificado</span>
							<Switch
								checked={isCerticated}
								onChange={setIsCerticated}
								className={`${
									isCerticated ? 'bg-primary' : 'bg-primary/40'
								}
						relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span className='sr-only'>Certificate</span>
								<span
									aria-hidden='true'
									className={`${
										isCerticated ? 'translate-x-4' : 'translate-x-0'
									}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
						<div className='flex items-center justify-between'>
							<span className='font-bold '>Feedback</span>
							<Switch
								checked={isWithFeedback}
								onChange={setIsWithFeedback}
								className={`${
									isWithFeedback ? 'bg-primary' : 'bg-primary/40'
								}
						relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span className='sr-only'>Feedback</span>
								<span
									aria-hidden='true'
									className={`${
										isWithFeedback ? 'translate-x-4' : 'translate-x-0'
									}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
					</div>
				</div>
				<div className='w-full mb-10 bg-white p-4 shadow rounded-md'>
					<h4 className='text-2xl font-bold border-b mb-5'>Media</h4>
					<div className='px-2'>
						<div className=' mb-5'>
							<label htmlFor='title' className='font-bold '>
								Imagen
							</label>
							<input
								{...register('image')}
								type='file'
								accept='image/*'
								name='image'
								placeholder='Imagen'
								className='w-full border file:px-4 file:py-3 file:w-28 file:bg-primary/10 file:text-primary file:font-bold file:border-none file:hover:bg-primary/30 cursor-pointer text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
							/>
						</div>
						<div className=' mb-5'>
							<label htmlFor='trailer' className='font-bold '>
								Trailer
							</label>
							<input
								{...register('trailer')}
								type='text'
								name='trailer'
								placeholder='Trailer'
								className='w-full border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
							/>
						</div>
					</div>
				</div>
				<div className='w-full mb-10 bg-white p-4 shadow rounded-md'>
					<h4 className='text-2xl font-bold border-b mb-5'>Acceso</h4>
					<div className='px-2'>
						<div className='mb-5 flex items-center justify-between'>
							<span className='font-bold '>En línea</span>
							<Switch
								checked={isOnline}
								onChange={setIsOnline}
								className={`${
									isOnline ? 'bg-primary' : 'bg-primary/40'
								}
						relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span className='sr-only'>Online</span>
								<span
									aria-hidden='true'
									className={`${
										isOnline ? 'translate-x-4' : 'translate-x-0'
									}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
						<div className='mb-5 flex items-center justify-between'>
							<span className='font-bold '>Oculto</span>
							<Switch
								checked={isHidden}
								onChange={setIsHidden}
								className={`${
									isHidden ? 'bg-primary' : 'bg-primary/40'
								}
						relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span className='sr-only'>Hidden</span>
								<span
									aria-hidden='true'
									className={`${
										isHidden ? 'translate-x-4' : 'translate-x-0'
									}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
						<div className='mb-3 flex items-center justify-between'>
							<span className='font-bold '>Privado</span>
							<Switch
								checked={isPrivate}
								onChange={setIsPrivate}
								className={`${
									isPrivate ? 'bg-primary' : 'bg-primary/40'
								}
						relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span className='sr-only'>Private</span>
								<span
									aria-hidden='true'
									className={`${
										isPrivate ? 'translate-x-4' : 'translate-x-0'
									}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
						</div>
						<div className='mb-5 flex items-center justify-between'>
							<span className='font-bold '>Tiempo de acceso</span>
							<input
								{...register('timeToAccess')}
								nane='timeToAccess'
								type='number'
								min={6}
								className='w-28 border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
							/>
						</div>
					</div>
				</div>
				<div className='w-full mb-10 bg-white p-4 shadow rounded-md'>
					<h4 className='text-2xl font-bold border-b mb-5'>Precio</h4>
					<div className='px-2'>
						<div className='mb-3 flex items-center justify-between'>
							<span className='font-bold '>Precio</span>
							<input
								{...register('price')}
								nane='price'
								type='text'
								min={6}
								className='w-28 border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<span className='font-bold '>Descuento</span>
							<input
								{...register('discount')}
								nane='discount'
								type='text'
								min={6}
								className='w-28 border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
							/>
						</div>
					</div>
				</div>
				<div className='w-full'>
					<button className='w-full shadow rounded-lg py-2 px-3 text-button text-primary bg-primary/10 hover:bg-primary/30'>
						Guardar
					</button>
				</div>
			</form>
		</>
	);
};

export default Settings;
