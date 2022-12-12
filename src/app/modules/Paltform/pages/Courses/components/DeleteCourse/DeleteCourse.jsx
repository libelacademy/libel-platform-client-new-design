/** @format */

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteCourse } from '@/app/modules/Paltform/services';
import { useDispatch } from 'react-redux';
import { removeCourse } from '@/store/admin.slice';

const DeleteCourse = ({ isOpen, closeModal, course }) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleDeleteCourse = async () => {
		setLoading(true);
		try {
			const response = await deleteCourse(course._id)
			toast.success(response.message);
			dispatch(removeCourse(response.data));
			closeModal();
			
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={() => {
					closeModal();
				}}>
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
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full md:min-w-[320px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-heading-5 text-gray-900'>
									Eliminar Curso
								</Dialog.Title>
								<div className='mt-2'>
									<p className='text-body-1 text-gray-500 px-2'>
										¿Estás seguro que deseas eliminar el curso{' '}
										<span className='font-bold'>{course?.title}</span>
										?
									</p>
									<p className='text-body-1 text-gray-500 px-2'>
										Este curso tiene {course?.students}{' '}
										{course?.students === 1
											? 'estudiante'
											: 'estudiantes'}{' '}
										{course?.students > 1 ? 'inscritos' : 'inscrito'}{' '}
										y {course?.lessons.length}{' '}
										{course?.lessons.length === 1
											? 'lección'
											: 'lecciones'}{' '}
										creadas.
									</p>
									<p className='text-body-1 text-gray-500 px-2'>
										Esta acción no se puede deshacer.
									</p>
								</div>

								<div className='mt-4 flex items-center justify-center gap-4'>
									<button
										type='button'
										disabled={loading}
										className='w-full inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-3 text-button text-red-500 hover:bg-red-200 focus:outline-none'
										onClick={handleDeleteCourse}>
										{loading ? (
											<>
												<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
												Eliminado...
											</>
										) : (
											<span>Eliminar curso</span>
										)}
									</button>
									<button
										type='button'
										className='w-full inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-3 text-button text-white focus:outline-none'
										onClick={() => {
											closeModal();
										}}>
										Cancelar
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default DeleteCourse;
