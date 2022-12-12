/** @format */

import { Input, SelectCountry } from '@/app/shared/components';
import { updateUser } from '@/store/auth.slice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAvatar } from '../SelectAvatar';

const EditProfile = ({ avatars }) => {
	const { user } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		reset,
	} = useForm();
	const dispatch = useDispatch();

	const handleSetAvatar = (avatar) => {
		setAvatar(avatar);
	};

	const onSubmit = (data) => {
		setLoading(true);
		const {
			name,
			lastName,
			facebook,
			instagram,
			twitter,
			linkedin,
			...newUser
		} = data;
		newUser.name = `${name} ${lastName}`;
		newUser.social = {
			facebook,
			instagram,
			twitter,
			linkedin,
		};
		if (avatar) {
			newUser.avatar = avatar.image._id;
		}

		console.log(newUser);
		dispatch(updateUser(newUser))
			.unwrap()
			.then((res) => {
				toast.success('¡Tu perfil se ha actualizado correctamente!');
				setLoading(false);
			})
			.catch((err) => {
				toast.error(err.message);
				setLoading(false);
				reset();
			});
	};

	return (
		<>
			<SelectAvatar
				avatars={avatars.filter((avatar) => avatar.default === false)}
				handleModal={setIsAvatarModalOpen}
				isOpen={isAvatarModalOpen}
				setAvatar={handleSetAvatar}
			/>
			<div className='bg-white shadow  rounded-lg'>
				<header className='w-full p-[15px] border-b '>
					<h2 className='text-heading-5'>Editar perfil</h2>
				</header>
				{user && (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full p-6 flex flex-col lg:flex-row gap-10 '>
						<div className='w-full max-w-xs  mx-auto'>
							<div className=' relative w-full p-5 shadow-item rounded-lg flex flex-col gap-5'>
								<figure className='w-full aspect-square rounded-md overflow-hidden bg-white-2'>
									<img
										src={avatar?.image?.url || user?.avatar.url}
										alt='avatar'
										className='w-full h-full object-cover'
									/>
								</figure>
								<button
									type='button'
									onClick={() => setIsAvatarModalOpen(true)}
									className='w-full rounded-full text-button text-center py-3 bg-primary/10 hover:bg-primary/30 text-primary'>
									Actualizar avatar
								</button>
								<button
									type='button'
									onClick={() => {
										handleSetAvatar(
											avatars.find((avatar) => avatar.default),
										);
									}}
									className='w-full rounded-full text-button text-center py-3 bg-primary/10 hover:bg-primary/30 text-primary'>
									Eliminar
								</button>
							</div>
						</div>
						<div className='flex-1'>
							<div className='w-full flex flex-col lg:flex-row gap-5 lg:gap-10'>
								<div className='flex-1'>
									<h4 className='text-heading-6 mb-10'>
										Información personal
									</h4>
									<div>
										<div className='flex flex-col md:flex-row md:space-x-6'>
											<div className='flex-1'>
												<Input
													name='name'
													placeholder={'Nombre'}
													register={register}
													errors={errors}
													type='text'
													value={user?.name.split(' ')[0]}
												/>
											</div>
											<div className='flex-1'>
												<Input
													name='lastName'
													placeholder={'Apellido'}
													register={register}
													errors={errors}
													type='text'
													value={user?.name.split(' ')[1]}
												/>
											</div>
										</div>
										<Input
											name='username'
											placeholder={'Nombre de usuario'}
											register={register}
											errors={errors}
											type='text'
											value={user?.username}
										/>
										<Input
											name='email'
											placeholder={'Correo electrónico'}
											register={register}
											errors={errors}
											type='email'
											value={user?.email}
										/>
										<SelectCountry
											name='country'
											register={register}
											setValue={setValue}
											value={user?.country}
										/>
										<Input
											name='phone'
											placeholder={'Teléfono'}
											register={register}
											errors={errors}
											type='text'
											value={user?.phone}
										/>
									</div>
								</div>
								<div className='flex-1'>
									{/* 
									//TODO: Add base url
									*/}
									<h4 className='text-heading-6 mb-10'>
										Redes Sociales
									</h4>
									<div>
										<Input
											name='facebook'
											placeholder={'Facebook'}
											register={register}
											errors={errors}
											type='text'
											value={user?.social?.facebook}
										/>
										<Input
											name='instagram'
											placeholder={'Instagram'}
											register={register}
											errors={errors}
											type='text'
											value={user?.social?.instagram}
										/>
										<Input
											name='twitter'
											placeholder={'Twitter'}
											register={register}
											errors={errors}
											type='text'
											value={user?.social?.twitter}
										/>
										<Input
											name='linkedin'
											placeholder={'LinkedIn'}
											register={register}
											errors={errors}
											type='text'
											value={user?.social?.linkedin}
										/>
									</div>
								</div>
							</div>
							<div className='w-full flex items-center justify-center lg:justify-end'>
								<button
									type='submit'
									disabled={loading}
									className='w-full max-w-sm rounded-full flex items-center justify-center text-button text-center py-3 bg-primary/10 hover:bg-primary/30 text-primary'>
									{loading ? (
										<>
											<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
											Cargando...
										</>
									) : (
										'Actualizar perfil'
									)}
								</button>
							</div>
						</div>
					</form>
				)}
			</div>
		</>
	);
};

export default EditProfile;
