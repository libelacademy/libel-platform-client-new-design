/** @format */

import { classnames } from '@/app/shared/utils';
import { deleteUser } from '@/store/admin.slice';
import {
	Dialog,
	Listbox,
	RadioGroup,
	Transition,
} from '@headlessui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiCheckLine, RiCodeSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmDeleteUser = ({
	isOpen,
	closeModal,
	user,
	instructors,
}) => {
	const { loading } = useSelector((state) => state.admin);
	const [courses, setCourses] = useState([]);
	const [selectedInstructor, setSelectedInstructor] = useState(null);
	const [takeOption, setTakeOption] = useState('');
	const dispatch = useDispatch();

	const handleDeleteUser = () => {
		if (
			user.role === 'instructor' &&
			takeOption === 'reassign' &&
			!selectedInstructor
		) {
			toast.error(
				'Por favor seleccione un instructor para reasignar los cursos.',
			);
			return;
		}
		dispatch(
			deleteUser(
				takeOption === 'reassign'
					? {
							id: user._id,
							newInstructor: selectedInstructor._id,
					  }
					: {
							id: user._id,
					  },
			),
		)
			.unwrap()
			.then(() => {
				toast.success('Usuario eliminado con éxito.');
				setTakeOption('')
				setSelectedInstructor(null)
				closeModal();
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const handleClose = () => {
		closeModal();
		setSelectedInstructor(null)
		setTakeOption('');
	};

	const getCourses = useCallback(async () => {
		if (user?.role === 'instructor') {
			const { data: response } = await axios.get(
				`/api/courses/instructor/${user?._id}`,
			);
			setCourses(response.data);
		}
	}, [user]);

	useEffect(() => {
		if (user && user.role === 'instructor') {
			getCourses();
		}
	}, [user]);

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
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-[20px] bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h4'
									className='text-[20px] leading-[26px] mb-5'>
									Eliminar Usuario
								</Dialog.Title>
								<div className='w-full'>
									<div className='w-full mb-10'>
										<p className='text-base text-center text-gray-500 mt-2'>
											¿Estás seguro de eliminar a {user?.name}?
										</p>
										{user?.role === 'instructor' &&
											courses.length > 0 && (
												<div className='w-full mt-5'>
													<p className='text-base text-gray-500 mt-2'>
														El instructor tiene{' '}
														<strong>{courses.length} cursos </strong>
														asociados, que deseas hacer:
													</p>
													<div className='w-full mt-5'>
														<RadioGroup
															value={takeOption}
															onChange={setTakeOption}>
															<RadioGroup.Label className='sr-only'>
																Delete Instructor Options
															</RadioGroup.Label>
															<div className='space-y-2'>
																<RadioGroup.Option
																	value='delete'
																	className={({ active, checked }) =>
																		`${
																			active
																				? 'ring-2 ring-offset-2 ring-offset-gray-100 ring-white ring-opacity-60'
																				: ''
																		}
																	${
																		checked
																			? 'bg-gray-100 border-transparent text-gray-900'
																			: 'border-gray-200 text-gray-500'
																	}
																	relative rounded-lg border p-4 flex cursor-pointer focus:outline-none`
																	}>
																	{({ active, checked }) => (
																		<>
																			<span
																				className={`${
																					checked
																						? 'border-2 border-gray-500'
																						: 'border-2 border-transparent'
																				}
																			h-4 w-4 mt-0.5 cursor-pointer rounded-full bg-white border flex items-center justify-center transition-colors ease-in-out duration-200`}
																				aria-hidden='true'>
																				<span className='rounded-full bg-white w-1.5 h-1.5' />
																			</span>
																			<div className='ml-3 flex flex-col'>
																				<RadioGroup.Label
																					as='span'
																					className={`block text-sm font-medium ${
																						checked
																							? 'text-gray-900'
																							: 'text-gray-500'
																					}`}>
																					Eliminar cursos
																				</RadioGroup.Label>
																				<RadioGroup.Description
																					as='span'
																					className={`block text-sm ${
																						checked
																							? 'text-gray-500'
																							: 'text-gray-400'
																					}`}>
																					Se eliminaran todos los
																					cursos asociados a este
																					instructor
																				</RadioGroup.Description>
																			</div>
																		</>
																	)}
																</RadioGroup.Option>
																<RadioGroup.Option
																	value='reassign'
																	className={({ active, checked }) =>
																		`${
																			active
																				? 'ring-2 ring-offset-2 ring-offset-gray-100 ring-white ring-opacity-60'
																				: ''
																		}
																	${
																		checked
																			? 'bg-gray-100 border-transparent text-gray-900'
																			: 'border-gray-200 text-gray-500'
																	}
																	relative rounded-lg border p-4 flex cursor-pointer focus:outline-none`
																	}>
																	{({ active, checked }) => (
																		<>
																			<span
																				className={`${
																					checked
																						? 'border-2 border-gray-500'
																						: 'border-2 border-transparent'
																				}
																			h-4 w-4 mt-0.5 cursor-pointer rounded-full bg-white border flex items-center justify-center transition-colors ease-in-out duration-200`}
																				aria-hidden='true'>
																				<span className='rounded-full bg-white w-1.5 h-1.5' />
																			</span>
																			<div className='ml-3 flex flex-col'>
																				<RadioGroup.Label
																					as='span'
																					className={`block text-sm font-medium ${
																						checked
																							? 'text-gray-900'
																							: 'text-gray-500'
																					}`}>
																					Reasignar cursos
																				</RadioGroup.Label>
																				<RadioGroup.Description
																					as='span'
																					className={`block text-sm ${
																						checked
																							? 'text-gray-500'
																							: 'text-gray-400'
																					}`}>
																					Se reasignaran los cursos a
																					otro instructor
																				</RadioGroup.Description>
																			</div>
																		</>
																	)}
																</RadioGroup.Option>
															</div>
														</RadioGroup>
													</div>
													<div
														className={classnames(
															'relative w-full mt-5 transition-all duration-300',
															takeOption === 'reassign'
																? 'opacity-100 visible h-auto'
																: 'opacity-0 invisible h-0',
														)}>
														<Listbox
															value={selectedInstructor}
															onChange={setSelectedInstructor}>
															<div className='relative'>
																<Listbox.Button className='w-full flex items-center justify-between bg-transparent border border-dark-secondary px-5 py-3 text-caption rounded-lg focus:outline-none text-white-2'>
																	<span>
																		{selectedInstructor?.name ||
																			'Selecciona un instructor'}
																	</span>
																	<RiCodeSLine
																		size={16}
																		className='rotate-90'
																	/>
																</Listbox.Button>
																<Listbox.Options className='absolute -top-2 border border-dark-secondary -translate-y-full font-light py-1 mb-1 w-full max-h-60  overflow-auto rounded-md bg-light-background-secondary  text-sm shadow-lg focus:outline-none'>
																	{instructors.map((instructor) => (
																		<Listbox.Option
																			key={instructor._id}
																			value={instructor}
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
																						{instructor.name}
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
												</div>
											)}
									</div>
									<div className='w-full mt-4 flex gap-4'>
										{/* {user?.role === 'student' && (
											<button
												type='button'
												disabled={loading}
												className='flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button bg-critical/10 text-critical duration-300 hover:bg-critical/30'
												onClick={handleDeleteUser}>
												{loading ? (
													<>
														<div className='h-5 w-5 border-4 border-r-critical/50 rounded-full mr-2 animate-spin' />
														Cargando...
													</>
												) : (
													'Eliminar'
												)}
											</button>
										)} */}
										{user?.role === 'instructor' && courses.length > 0 ? (
											<button
												type='button'
												disabled={loading || !takeOption}
												className={classnames(
													'flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button',
													takeOption
														? 'bg-critical/10 text-critical duration-300 hover:bg-critical/30'
														: 'bg-gray-100 text-gray-700 duration-300 cursor-not-allowed',
												)}
												onClick={handleDeleteUser}>
												{loading ? (
													<>
														<div className='h-5 w-5 border-4 border-r-critical/50 rounded-full mr-2 animate-spin' />
														Cargando...
													</>
												) : (
													'Eliminar'
												)}
											</button>
										) : (
											<button
												type='button'
												disabled={loading}
												className='flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button bg-critical/10 text-critical duration-300 hover:bg-critical/30'
												onClick={handleDeleteUser}>
												{loading ? (
													<>
														<div className='h-5 w-5 border-4 border-r-critical/50 rounded-full mr-2 animate-spin' />
														Cargando...
													</>
												) : (
													'Eliminar'
												)}
											</button>
										)
									
									}
										<button
											type='button'
											className='flex-1 flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-critical text-white duration-300'
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

export default ConfirmDeleteUser;
