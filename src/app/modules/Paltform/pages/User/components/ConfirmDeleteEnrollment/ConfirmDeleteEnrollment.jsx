/** @format */

import { deleteEnrollment } from '@/store/admin.slice';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const ConfirmDeleteEnrollment = ({
	isOpen,
	closeModal,
	enrollment,
	course,
}) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		try {
			const {data: response} = await axios.delete(`/api/enrollments/${enrollment}`);
			toast.success(response.message);
			dispatch(deleteEnrollment(enrollment));
			setLoading(false);
			closeModal();
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-20' onClose={closeModal}>
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
									Eliminar matrícula
								</Dialog.Title>
								<div className='grid grid-cols-3 md:grid-cols-4 gap-3 mb-6'>
									<div className='col-span-3 md:col-span-4'>
										<p className='text-base text-gray-500 mt-2 text-center'>
											¿Estás seguro que quieres eliminar la matrícula
											al curso <strong>{course}</strong>?
										</p>
									</div>
								</div>
								<div className='w-full mt-4 flex gap-4'>
									<button
										type='button'
										className='flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button bg-critical/10 text-critical duration-300 hover:bg-critical/30'
										onClick={handleDelete}>
										{loading ? (
											<>
												<div className='h-5 w-5 border-4 border-r-critical/50 rounded-full mr-2 animate-spin' />
												Cargando...
											</>
										) : (
											'Eliminar'
										)}
									</button>
									<button
										type='button'
										className='flex-1 flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-critical text-white duration-300'
										onClick={closeModal}>
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

export default ConfirmDeleteEnrollment;
