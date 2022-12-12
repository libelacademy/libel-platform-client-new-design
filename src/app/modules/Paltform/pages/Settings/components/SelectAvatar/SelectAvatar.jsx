/** @format */

import { classnames } from '@/app/shared/utils';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const SelectAvatar = ({
	isOpen,
	handleModal,
	setAvatar,
	avatars,
}) => {
	const [selectedAvatar, setSelectedAvatar] = useState({});

	const closeModal = () => {
		handleModal(false);
	};

	const handleSelectAvatar = () => {
		setAvatar(selectedAvatar);
		closeModal();
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
							<Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-[20px] bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title as='h4' className='text-heading-5 mb-5'>
									Selecciona tu avatar
								</Dialog.Title>
								<div className='grid grid-cols-3 md:grid-cols-4 max-h-[398px] md:max-h-[393px] overflow-y-auto gap-3 mb-6'>
									{avatars.map((avatar) => (
										<div
											key={avatar._id}
											onClick={() => setSelectedAvatar(avatar)}
											className={classnames(
												'flex justify-center items-center p-1 rounded-lg cursor-pointer duration-300 hover:bg-primary',
												selectedAvatar._id === avatar._id
													? 'bg-primary'
													: 'bg-primary/10',
											)}>
											<figure className='relative w-full aspect-square rounded-md bg-white overflow-hidden'>
												<img src={avatar.image.url} alt={'Avatar'} />
												{selectedAvatar._id === avatar._id && (
													<div className='absolute w-full h-full top-0 left-0 bg-primary/50 flex items-center justify-center'>
														<RiCheckboxCircleFill
															size={24}
															className='text-white'
														/>
													</div>
												)}
											</figure>
										</div>
									))}
								</div>
								<div className='mt-4 space-x-3'>
									<button
										type='button'
										className='inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-primary/10 text-primary duration-300 hover:bg-primary/30'
										onClick={handleSelectAvatar}>
										Seleccionar
									</button>
									<button
										type='button'
										className='inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-primary text-white duration-300'
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

export default SelectAvatar;
