/** @format */

import React from 'react';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAvatar } from '@/store/admin.slice';
import { toast } from 'react-hot-toast';

const DeleteAvatar = ({
	isOpen,
	closeModal,
	avatar,
	setSelectedAvatar,
}) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleDeleteAvatar = () => {
		setLoading(true);
		try {
			dispatch(deleteAvatar(avatar._id));
			toast.success('Avatar eliminado correctamente');
			setLoading(false);
			setSelectedAvatar(null);
			closeModal();
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={() => {
					setSelectedAvatar(null);
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
							<Dialog.Panel className='w-full md:min-w-[320px] max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-heading-5 text-gray-900'>
									Eliminar Avatar
								</Dialog.Title>
								<div className='mt-2'>
									<figure className=' w-full aspect-square overflow-hidden rounded-md bg-primary/20'>
										<img
											src={avatar?.image.url}
											alt='Avatar'
											className='w-full h-full object-cover'
										/>
									</figure>
								</div>

								<div className='mt-4'>
									<button
										type='button'
										disabled={loading}
										className='w-full inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-3 text-button text-red-500 hover:bg-red-200 focus:outline-none mb-5'
										onClick={handleDeleteAvatar}>
										{loading ? (
											<>
												<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
												Eliminado...
											</>
										) : (
											<span>Eliminar avatar</span>
										)}
									</button>
									<button
										type='button'
										className='w-full inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-3 text-button text-white focus:outline-none'
										onClick={() => {
											setSelectedAvatar(null);
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

export default DeleteAvatar;
