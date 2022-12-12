/** @format */

import { uploadFile } from '@/app/modules/Paltform/services/file.service';
import { addAvatar } from '@/store/admin.slice';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

const AddAvatar = ({ isOpen, closeModal }) => {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handleAddAvatar = async () => {
		setLoading(true);
		try {
			const image = await uploadFile(file);
			console.log(image);
			dispatch(
				addAvatar({
					image: image._id,
					name: image.filename,
				}),
			);
			toast.success('Avatar agregado correctamente');
			setLoading(false);
			setFile(null);
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
					setFile(null);
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
									Añadir Avatar
								</Dialog.Title>
								<div className='mt-2'>
									<label
										htmlFor='upload-file'
										className='flex flex-col justify-center items-center w-full aspect-square bg-primary/5 rounded-lg border-2 border-primary/30 border-dashed cursor-pointer hover:bg-primary/10 '>
										{file ? (
											<figure className='w-full h-full overflow-hidden rounded-md bg-primary/20'>
												<img
													src={URL.createObjectURL(file)}
													alt='Avatar'
													className='w-full h-full object-cover'
												/>
											</figure>
										) : (
											<div className='flex flex-col justify-center items-center pt-5 pb-6'>
												<RiUploadCloud2Line className='mb-3 w-10 h-10 text-primary/40' />
												<p className='mb-2 text-sm text-gray-500'>
													<span className='font-semibold'>
														Click para subir
													</span>{' '}
												</p>
												<p className='text-xs text-gray-500'>
													SVG, PNG, JPG
												</p>
											</div>
										)}
										<input
											id='upload-file'
											type='file'
											accept='image/*'
											className='hidden'
											onChange={(e) => setFile(e.target.files[0])}
										/>
									</label>
								</div>

								<div className='mt-4'>
									<button
										type='button'
										disabled={loading}
										className='w-full inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 px-4 py-3 text-button text-primary hover:bg-primary/20 focus:outline-none mb-5'
										onClick={handleAddAvatar}>
										{loading ? (
											<>
												<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
												Subiendo...
											</>
										) : (
											<span>Guardar avatar</span>
										)}
									</button>
									<button
										type='button'
										className='w-full inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-3 text-button text-white focus:outline-none'
										onClick={() => {
											setFile(null);
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

export default AddAvatar;
