/** @format */

import { Input } from '@/app/shared/components';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Header, Title } from '../../components';
import { forgotPassword } from '../../services';

const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [send, setSend] = useState(false);

	const onSubmit = async (data) => {
		setLoading(true);
		const { email } = data;
		try {
			const { data: response } = await forgotPassword(email);
			toast.success(response.message);
			reset();
			setSend(true);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	return (
		<main>
			<Header title='Restablecer Contraseña' />
			<section className='section px-[15px] bg-light-background-primary dark:bg-dark-background-primary'>
				<div className='container'>
					<Title title='Libel Academy' />
					{!send ? (
						<>
							<h5 className='text-heading-5 text-light-onSurface dark:text-dark-onSurface text-center mb-6'>
								Olvidaste tu contraseña
							</h5>
							<p className='w-full max-w-lg mx-auto text-center text-light-secondary dark:text-dark-onSurface mb-12'>
								Esta bien. ¡A veces sucede! Ingresa tu correo
								electrónico y nosotros te enviaremos los pasos para
								restablecer la contraseña.
							</p>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='w-full max-w-md mx-auto'>
								<Input
									name='email'
									placeholder={'Correo electrónico'}
									register={register}
									errors={errors}
									type='email'
								/>
								<button
									type='submit'
									disabled={loading}
									className='w-full py-4 flex items-center justify-center text-button rounded-full bg-primary/10 dark:bg-transparent border-2 border-primary/0 dark:border-white dark:text-white text-primary hover:bg-primary hover:text-white hover:border-primary hover:dark:border-primary hover:dark:bg-primary hover:dark:text-white transition-colors duration-300'>
									{loading ? (
										<>
											<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
											Cargando...
										</>
									) : (
										'Restabelcer Contraseña'
									)}
								</button>
							</form>
						</>
					) : (
						<>
							<h5 className='text-heading-5 text-light-onSurface dark:text-dark-onSurface text-center mb-6'>
								Revisa tu correo electrónico
							</h5>
							<p className='w-full max-w-xs mx-auto text-center text-light-secondary dark:text-dark-onSurface mb-12'>
								¿No lo has recibido? Revisa tu filtro de spam, o{' '}
								<span
									onClick={() => {
										setSend(false);
									}}
									className='text-primary cursor-pointer hover:underline'>
									prueba con otro correo electrónico
								</span>
							</p>
							<Link
								to='/login'
								className='w-full max-w-lg mx-auto py-4 flex items-center justify-center text-button rounded-full bg-primary/10 dark:bg-transparent border-2 border-primary/0 dark:border-white dark:text-white text-primary hover:bg-primary hover:text-white hover:border-primary hover:dark:border-primary hover:dark:bg-primary hover:dark:text-white transition-colors duration-300'>
								Iniciar Sesión
							</Link>
						</>
					)}
				</div>
			</section>
		</main>
	);
};

export default ForgotPassword;
