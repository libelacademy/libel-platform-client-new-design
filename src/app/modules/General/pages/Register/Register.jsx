/** @format */

import React from 'react';
import { useForm } from 'react-hook-form';
import { RiFacebookCircleFill, RiGoogleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import {
	Header,
	Title,
} from '../../components';
import { registerSschema } from '../../validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/store/auth.slice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Input, SelectCountry } from '@/app/shared/components';

const Register = () => {
	const {
		handleSubmit,
		register: registerForm,
		setValue,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(registerSschema),
	});
	
	const { loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		const { name, lastName, ...newUser } = data;
		newUser.name = `${name} ${lastName}`;
		dispatch(register(newUser))
			.unwrap()
			.then((res) => {
				toast.success(res.message);
				reset();
				navigate('/courses');
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<main>
			<Header title='registro' />
			<section className='section px-[15px] bg-light-background-primary dark:bg-dark-background-primary'>
				<div className='container'>
					<Title title='Libel Academy' />
					<div className='w-full max-w-lg mx-auto mb-8'>
						<div className='mb-7 text-center'>
							<h5 className='relative flex whitespace-nowrap text-body-3 text-light-secondary dark:text-dark-secondary before:content-[""] before:block before:h-px before:relative  before:top-3.5 before:-translate-y-1/2 before:bg-dark-secondary before:dark:bg-dark-background-secondary before:w-full before:mr-5 after:content-[""] after:block after:h-px after:relative  after:top-3.5 after:-translate-y-1/2 after:bg-dark-secondary  after:dark:bg-dark-background-secondary after:w-full after:ml-5'>
								Regístrate con redes sociales
							</h5>
						</div>
						<div className='w-full flex items-center justify-center space-x-3 mb-6'>
							<a
								href='/'
								className='group flex-1 border-2 border-primary rounded-full py-3 flex items-center justify-center text-button dark:text-white hover:bg-primary hover:text-white hover:dark:bg-white hover:dark:text-primary hover:dark:border-white transition-all duration-300'>
								<RiGoogleFill
									size={18}
									className='mr-2 text-primary dark:text-white group-hover:text-white dark:group-hover:text-primary transition-all duration-300'
								/>
								Google
							</a>
							<a
								href='/'
								className='group flex-1 border-2 border-primary rounded-full py-3 flex items-center justify-center text-button dark:text-white hover:bg-primary hover:text-white hover:dark:bg-white hover:dark:text-primary hover:dark:border-white transition-all duration-300'>
								<RiFacebookCircleFill
									size={18}
									className='mr-2 text-primary dark:text-white group-hover:text-white dark:group-hover:text-primary transition-all duration-300'
								/>
								Facebook
							</a>
						</div>
						<div className='mb-7 text-center'>
							<h5 className='relative flex whitespace-nowrap text-body-3 text-light-secondary dark:text-dark-secondary before:content-[""] before:block before:h-px before:relative  before:top-3.5 before:-translate-y-1/2 before:bg-dark-secondary before:dark:bg-dark-background-secondary before:w-full before:mr-5 after:content-[""] after:block after:h-px after:relative  after:top-3.5 after:-translate-y-1/2 after:bg-dark-secondary  after:dark:bg-dark-background-secondary after:w-full after:ml-5'>
								O regístrate con tu correo electrónico
							</h5>
						</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='w-full max-w-lg mx-auto'>
							<div className='flex flex-col md:flex-row md:space-x-6'>
								<div className='flex-1'>
									<Input
										name='name'
										placeholder={'Nombre'}
										register={registerForm}
										errors={errors}
										type='text'
									/>
								</div>
								<div className='flex-1'>
									<Input
										name='lastName'
										placeholder={'Apellido'}
										register={registerForm}
										errors={errors}
										type='text'
									/>
								</div>
							</div>
							<Input
								name='email'
								placeholder={'Correo electrónico'}
								register={registerForm}
								errors={errors}
								type='email'
							/>
							<div className='flex flex-col md:flex-row md:space-x-6'>
								<div className='flex-1'>
									<Input
										name='password'
										placeholder={'Contraseña'}
										register={registerForm}
										errors={errors}
										type='password'
									/>
								</div>
								<div className='flex-1'>
									<Input
										name='confirmPassword'
										placeholder={'Confirmar contraseña'}
										register={registerForm}
										errors={errors}
										type='password'
									/>
								</div>
							</div>
							<SelectCountry
								name='country'
								register={registerForm}
								setValue={setValue}
							/>
							<Input
								name='phone'
								placeholder={'Teléfono'}
								register={registerForm}
								errors={errors}
								type='text'
							/>
							<p className='text-center text-caption max-w-sm mx-auto text-light-secondary dark:text-dark-onSurface mb-5'>
								Al registrarte, aceptas nuestra{' '}
								<span className='text-primary cursor-pointer duration-300 hover:underline'>
									política de privacidad
								</span>{' '}
								y nuestros{' '}
								<span className='text-primary cursor-pointer duration-300 hover:underline'>
									términos y condiciones.
								</span>
							</p>
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
									'Crea tu cuenta'
								)}
							</button>
						</form>
					</div>
					<p className='text-center text-light-secondary dark:text-dark-onSurface mb-5'>
						Si ya tiene una cuenta, solo{' '}
						<Link
							to='/login'
							className='text-primary duration-300 hover:underline'>
							inicia sesión.
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
};

export default Register;
