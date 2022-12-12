/** @format */

import { setDefaultAvatar } from '@/store/admin.slice';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import { uploadFile } from '../../services/file.service';
import { AddAvatar, DeleteAvatar } from './components';

const Avatars = () => {
	const { avatars, loading } = useSelector((state) => state.admin);
	const [showAddAvatar, setShowAddAvatar] = useState(false);
	const [showDeleteAvatar, setShowDeleteAvatar] = useState(false);

	const [avatarToDelete, setAvatarToDelete] = useState(null);
	const [selectedDefaultAvatar, setSelectedDefaultAvatar] =
		useState(null);

	const dispatch = useDispatch();

	const handleDeleteAvatar = (avatar) => {
		setAvatarToDelete(avatar);
		setShowDeleteAvatar(true);
	};

	const handleSelectDefaultAvatar = async () => {
		try {
			const image = await uploadFile(selectedDefaultAvatar);
			dispatch(
				setDefaultAvatar({
					image: image._id,
				}),
			);
			setSelectedDefaultAvatar(null);
			toast.success('Avatar por defecto actualizado correctamente');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<main className='w-full pb-7'>
			<AddAvatar
				isOpen={showAddAvatar}
				closeModal={() => setShowAddAvatar(false)}
			/>
			<DeleteAvatar
				isOpen={showDeleteAvatar}
				closeModal={() => setShowDeleteAvatar(false)}
				avatar={avatarToDelete}
				setSelectedAvatar={setAvatarToDelete}
			/>
			<Header title={'avatars'} />
			<div className='flex flex-col lg:flex-row gap-5'>
				<div className=' w-full lg:max-w-xs'>
					<div className='w-full bg-white shadow rounded-lg'>
						<header className='w-full h-[60px] p-4 border-b '>
							<h2 className='text-heading-6'>Defatul Avatar</h2>
						</header>
						<div className='p-4'>
							<figure className='w-full aspect-square rounded-md overflow-hidden bg-slate-500 mb-5 border'>
								<img
									src={
										selectedDefaultAvatar
											? URL.createObjectURL(selectedDefaultAvatar)
											: avatars?.find((avatar) => avatar.default)
													.image?.url
									}
									alt='default avatar'
									className='w-full h-full object-cover'
								/>
							</figure>
							{selectedDefaultAvatar ? (
								<>
									<button
										onClick={handleSelectDefaultAvatar}
										disabled={loading}
										className='inline-flex items-center justify-center w-full bg-primary/10 text-primary py-3 rounded-md text-button hover:bg-primary/20 cursor-pointer mb-5'>
										{loading ? (
											<>
												<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
												Guardando...
											</>
										) : (
											<span>Guardar Cambios</span>
										)}
									</button>
									<button
										onClick={() => setSelectedDefaultAvatar(null)}
										className='inline-flex items-center justify-center w-full bg-primary text-white py-3 rounded-md text-button cursor-pointer'>
										Cancelar
									</button>
								</>
							) : (
								<label
									htmlFor='default-avatar'
									className='inline-flex items-center justify-center w-full bg-primary/10 text-primary py-3 rounded-md text-button hover:bg-primary/20 cursor-pointer'>
									Cambiar avatar
									<input
										type='file'
										name='default-avatar'
										id='default-avatar'
										className='hidden'
										onChange={(e) =>
											setSelectedDefaultAvatar(e.target.files[0])
										}
									/>
								</label>
							)}
						</div>
					</div>
				</div>
				<div className='w-full'>
					<div className='bg-white w-full shadow rounded-lg'>
						<header className='w-full h-[60px] px-4 border-b flex items-center justify-between'>
							<h2 className='text-heading-6'>Avatars</h2>
							<button
								onClick={() => setShowAddAvatar(true)}
								className='bg-primary/10 text-primary px-4 py-2 rounded-md text-button hover:bg-primary/20'>
								Agregar avatar
							</button>
						</header>
						<div className='p-4'>
							<div className='w-full  overflow-y-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
								{avatars
									?.filter((avatar) => !avatar.default)
									.map((avatar) => (
										<figure
											key={avatar._id}
											className='group relative w-full aspect-square rounded-md overflow-hidden bg-slate-500'>
											<img
												src={avatar.image.url}
												alt='avatar'
												className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300'
											/>
											<div className='absolute top-0 left-0 w-full h-full invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-primary/50 rounded-md flex items-center justify-center transition-all duration-300'>
												<button
													onClick={() => handleDeleteAvatar(avatar)}
													className='bg-red-500 text-white p-3 rounded-md text-button flex items-center justify-center'>
													<RiDeleteBinLine size={24} />
												</button>
											</div>
										</figure>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Avatars;
