/** @format */

import { changePassword } from '@/app/modules/Paltform/services';
import { changePasswordSchema } from '@/app/modules/Paltform/validations/change-password.validator';
import { Input } from '@/app/shared/components';
import { logout } from '@/store/auth.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(changePasswordSchema),
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		setLoading(true);
		const response = await changePassword({
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		});
		if (response.success) {
			toast.success(response.message);
			reset();
			dispatch(logout());
			navigate('/login');
		} else {
			toast.error(response.message);
		}
		setLoading(false);
	};

	return (
		<div className='bg-white shadow  rounded-lg'>
			<header className='w-full p-[15px] border-b '>
				<h2 className='text-heading-5'>Cambiar contraseña</h2>
			</header>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full p-6 flex flex-col lg:flex-row gap-10 lg:gap-20'>
				<div className='flex-1'>
					<Input
						name={'oldPassword'}
						placeholder='Contraseña actual'
						register={register}
						type='password'
						errors={errors}
					/>
					<p className='text-sm text-gray-500 mt-2 pl-4'>
						Para cambiar tu contraseña, debes ingresar tu contraseña
						actual.
					</p>
				</div>
				<div className='flex-1'>
					<Input
						name={'newPassword'}
						placeholder='Nueva contraseña'
						register={register}
						type='password'
						errors={errors}
					/>
					<Input
						name='confirmPassword'
						placeholder={'Confirmar contraseña'}
						register={register}
						errors={errors}
						type='password'
					/>
				</div>
				<div className='flex-1 flex items-start justify-center lg:justify-end'>
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
							'Cambiar contraseña'
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
