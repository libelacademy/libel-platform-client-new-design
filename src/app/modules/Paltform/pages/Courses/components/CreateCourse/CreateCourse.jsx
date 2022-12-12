/** @format */

import React from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/shared/components';
import { RiCheckLine, RiCodeSLine } from 'react-icons/ri';
import { createCourse } from '@/app/modules/Paltform/services';
import { useNavigate } from 'react-router-dom';

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

const CreateCourse = ({
	isOpen,
	closeModal,
	instructors,
	instructor,
	categories,
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [instructorSelected, setInstructorSelected] = useState(
		user.role === 'admin'
			? { _id: '', name: 'Seleccionar instructor' }
			: instructor,
	);
	const [categorySelected, setCategorySelected] = useState({
		_id: '',
		name: 'Seleccionar categoría',
	});
	const [levelSelected, setLevelSelected] = useState({
		_id: '',
		name: 'Seleccionar nivel',
	});

	const handleCloseModal = () => {
		reset();
		closeModal();
	};

	const onSubmit = async (data) => {
		console.log(data);
		const newCourse = {
			title: data.title,
			instructor: instructorSelected._id,
			category: categorySelected._id,
			level: levelSelected.value,
		};

		console.log(newCourse);
		const response = await createCourse(newCourse);
		if (response.success) {
			toast.success('Curso creado correctamente');
			navigate(`/platform/courses/${response.data._id}`)
			handleCloseModal();
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={handleCloseModal}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full md:min-w-[320px] max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-heading-5 text-gray-900'
								>
									Añadir Curso
								</Dialog.Title>

								<form
									onSubmit={handleSubmit(onSubmit)}
									className='mt-6'
								>
									<div className=' mb-5'>
										<input
											{...register('title')}
											type='text'
											name='title'
											placeholder='Título'
											className='w-full border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
										/>
									</div>
									{user.role === 'admin' && (
										<div className='mb-5'>
											<Listbox
												value={instructorSelected}
												onChange={setInstructorSelected}
											>
												<div className='relative mt-2'>
													<Listbox.Button className='relative  w-full flex items-center justify-between cursor-pointer rounded-lg bg-white py-2 px-4 text-left border border-dark-secondary  text-white-2 focus:outline-none'>
														<span className='block truncate'>
															{instructorSelected.name}
														</span>
														<RiCodeSLine
															size={16}
															className='rotate-90'
														/>
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
										<Listbox
											value={categorySelected}
											onChange={setCategorySelected}
										>
											<div className='relative mt-2'>
												<Listbox.Button className='relative w-full flex items-center justify-between cursor-pointer rounded-lg bg-white py-2 px-4 text-left border border-dark-secondary  text-white-2 focus:outline-none'>
													<span className='block truncate'>
														{categorySelected.name}
													</span>
													<RiCodeSLine
														size={16}
														className='rotate-90'
													/>
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
										<Listbox
											value={levelSelected}
											onChange={setLevelSelected}
										>
											<div className='relative mt-2'>
												<Listbox.Button className='relative w-full flex items-center justify-between cursor-pointer rounded-lg bg-white py-2 px-4 text-left border border-dark-secondary  text-white-2 focus:outline-none'>
													<span className='block truncate'>
														{levelSelected.name}
													</span>
													<RiCodeSLine
														size={16}
														className='rotate-90'
													/>
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
									<div className='mt-8 flex gap-4 items-center'>
										<button
											type='submit'
											disabled={loading}
											className='w-full inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 px-4 py-3 text-button text-primary hover:bg-primary/20 focus:outline-none'
										>
											{loading ? (
												<>
													<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
													Añadiendo...
												</>
											) : (
												<span>Añadir curso</span>
											)}
										</button>
										<button
											type='button'
											className='w-full inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-3 text-button text-white focus:outline-none'
											onClick={handleCloseModal}
										>
											Cancelar
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default CreateCourse;
