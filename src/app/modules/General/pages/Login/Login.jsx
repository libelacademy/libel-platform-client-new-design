/** @format */

import { Input } from '@/app/shared/components';
import { login } from '@/store/auth.slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RiFacebookCircleFill, RiGoogleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Header, Title } from '../../components';
import { loginSchema } from '../../validators';

const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(loginSchema),
	});
	const { loading } = useSelector((state) => state.auth);

	const disaptch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const onSubmit = (data) => {
		disaptch(login(data))
			.unwrap()
			.then((res) => {
				toast.success(res.message);
				reset();
				if (location.state?.from) {
					navigate(location.state?.from);
				} else {
					navigate('/platform');
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<main>
			<Header title='ingreso' />
			<section className='section px-[15px] bg-light-background-primary dark:bg-dark-background-primary'>
				<div className='container'>
					<Title title='Libel Academy' />
					<div className='w-full max-w-lg mx-auto mb-8'>
						<div className='mb-7 text-center'>
							<h5 className='relative flex whitespace-nowrap text-body-3 text-light-secondary dark:text-dark-secondary before:content-[""] before:block before:h-px before:relative  before:top-3.5 before:-translate-y-1/2 before:bg-dark-secondary before:dark:bg-dark-background-secondary before:w-full before:mr-5 after:content-[""] after:block after:h-px after:relative  after:top-3.5 after:-translate-y-1/2 after:bg-dark-secondary  after:dark:bg-dark-background-secondary after:w-full after:ml-5'>
								Ingresa con redes sociales
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
								O ingresa con tu correo electrónico
							</h5>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Input
								name={'email'}
								placeholder='Tu correo electrónico'
								register={register}
								type='email'
								errors={errors}
							/>
							<Input
								name={'password'}
								placeholder='Tu contraseña'
								register={register}
								type='password'
								errors={errors}
							/>
							<div className='mb-8 w-full flex items-center justify-end'>
								<Link
									// to={`/${AuthRoutes.AUTH}/${AuthRoutes.FORGOT_PASSWORD}`}
									to='/forgot-password'
									className='text-light-onSurface dark:text-dark-onSurface font-bold text-[14px] duration-300 hover:text-primary hover:dark:text-primary'>
									¿Olvidaste tu contraseña?
								</Link>
							</div>
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
									'Inicio de sesión'
								)}
							</button>
						</form>
					</div>
					<p className='text-center text-light-secondary dark:text-dark-onSurface'>
						Te inviatamos a{' '}
						<Link
							to={`/register`}
							className='text-primary transition duration-300 hover:underline '>
							registrarte
						</Link>{' '}
						si aún no tienes una cuenta.
					</p>
				</div>
			</section>
		</main>
	);
};

export default Login;
