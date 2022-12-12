/** @format */

import { classnames } from '@/app/shared/utils';
import { addEnrollment } from '@/store/admin.slice';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiCheckLine, RiCodeSLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

const EnrollCourse = ({ isOpen, closeModal, courses, student }) => {
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleClose = () => {
		closeModal();
		setSelectedCourse(null);
	};

	const handleEnroll = async () => {
		try {
			setLoading(true);
			const { data: response } = await axios.post(
				`/api/enrollments/${selectedCourse._id}`,
				{
					student: student,
				},
			);
			toast.success(response.message);
			dispatch(addEnrollment(response.data));
			setLoading(false);
			closeModal();
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-20'
				onClose={handleClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full min-w-[24rem] max-w-md transform  rounded-[20px] bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title as='h4' className='text-heading-5 mb-5'>
									Matricular Curso
								</Dialog.Title>
								<div className='w-full'>
									{courses.length > 0 ? (
										<div className='w-full mb-10'>
											<p className='text-base text-center text-gray-500 mb-5'>
												¿Qué curso desea matricularle al estudiante?
											</p>
											<Listbox
												value={selectedCourse}
												onChange={setSelectedCourse}>
												<div className='relative'>
													<Listbox.Button className='w-full flex items-center justify-between bg-transparent border border-dark-secondary px-5 py-3 text-caption rounded-lg focus:outline-none text-white-2'>
														<span>
															{selectedCourse?.title ||
																'Selecciona un curso'}
														</span>
														<RiCodeSLine
															size={16}
															className='rotate-90'
														/>
													</Listbox.Button>
													<Listbox.Options className='absolute -top-2 border border-dark-secondary -translate-y-full font-light py-1 mb-1 w-full max-h-60  overflow-auto rounded-md bg-light-background-secondary  text-sm shadow-lg focus:outline-none'>
														{courses.map((course) => (
															<Listbox.Option
																key={course._id}
																value={course}
																className={({ active }) =>
																	classnames(
																		'cursor-pointer select-none relative py-2 pl-10 pr-4',
																		active
																			? 'bg-primary/20 text-primary dark:text-white'
																			: 'text-white-2',
																	)
																}>
																{({ selected, active }) => (
																	<>
																		<span
																			className={classnames(
																				selected
																					? 'font-semibold'
																					: 'font-normal',
																				'block truncate',
																			)}>
																			{course.title}
																		</span>
																		{selected ? (
																			<span
																				className={classnames(
																					active
																						? 'text-white-2'
																						: 'text-white-2',
																					'absolute inset-y-0 left-0 flex items-center pl-3',
																				)}>
																				<RiCheckLine
																					size={20}
																					className='text-primary'
																				/>
																			</span>
																		) : null}
																	</>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</div>
											</Listbox>
										</div>
									) : (
										<div className='flex flex-col items-center justify-center'>
											<p className='text-white-2'>
												No tienes cursos disponibles
											</p>
										</div>
									)}
									<div className='w-full mt-4 flex gap-4'>
										<button
											type='button'
											disabled={loading || !selectedCourse}
											className={classnames(
												'flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button ',
												!selectedCourse
													? 'cursor-not-allowed bg-gray-100 text-gray-700 duration-300'
													: 'cursor-pointer bg-primary/10 text-primary duration-300 hover:bg-primary/30',
											)}
											onClick={handleEnroll}>
											{loading ? (
												<>
													<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
													Cargando...
												</>
											) : (
												'Matricular'
											)}
										</button>
										<button
											type='button'
											className='flex-1 flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-primary text-white duration-300'
											onClick={handleClose}>
											Cancelar
										</button>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default EnrollCourse;
