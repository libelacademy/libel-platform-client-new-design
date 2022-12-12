/** @format */

import { information } from '@/app/shared/utils';
import libelLogoDark from '@/assets/images/libel-logo-dark.png';
import libelLogo from '@/assets/images/libel-logo.png';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
	const { theme } = useSelector((state) => state.general);

	return (
		<footer className='bg-light-background-secondary dark:bg-dark-background-footer'>
			<div className='container px-[15px] pt-14'>
				<div className='w-full flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-start pb-10 border-b border-dark-secondary dark:border-dark-secondary/30'>
					<div className='flex-1 flex flex-col items-start'>
						<Link to='/' className='h-14 mb-3'>
							<img
								src={theme === 'light' ? libelLogoDark : libelLogo}
								alt='Libel Academy'
								className='h-full w-auto object-cover'
							/>
						</Link>
						<p className='text-light-onSurface dark:text-dark-onSurface text-caption mb-6'>
							{information.description}
						</p>
						<div className='w-full flex items-center'>
							{information.social.map(({ name, url, Icon }) => (
								<a
									href={url}
									key={name}
									className='group w-10 h-10 bg-dark-secondary dark:bg-[#343444] rounded-lg mr-2 flex items-center justify-center'>
									<Icon
										size={20}
										className='text-light-secondary dark:text-dark-secondary duration-300 group-hover:text-primary'
									/>
								</a>
							))}
						</div>
					</div>
					<div className='flex-1 lg:flex-[2]'></div>
					<div className='flex-1'>
						<h5 className='text-light-onSurface dark:text-dark-onSurface text-body-2 font-bold mb-6'>
							Suscríbete
						</h5>
						<p className='text-light-onSurface dark:text-dark-onSurface text-caption mb-6'>
							Suscríbete a nuestro boletín para recibir las últimas
							noticias en tu bandeja de entrada.
						</p>
						<form
							className='w-full h-12 flex items-center bg-light-background-footer dark:bg-dark-background-footer rounded-lg'
							onSubmit={(e) => {
								e.preventDefault();
								alert('Thank you for subscribing!');
							}}>
							<input
								type='email'
								placeholder='Correo electrónico'
								className='px-5 h-full w-full bg-light-background-footer dark:bg-dark-background-footer rounded-l-lg border border-dark-secondary dark:border-dark-secondary/30 border-r-0 text-light-onSurface dark:text-dark-onSurface text-caption placeholder:text-light-secondary'
							/>
							<button className='bg-primary text-white h-full aspect-square rounded-r-lg flex items-center justify-center'>
								<RiSendPlane2Fill />
							</button>
						</form>
					</div>
				</div>
				<div className='py-5 flex items-center justify-between'>
					<p className='text-light-secondary text-caption-2'>
						&copy; 2022 Libel Academy. Todos los derechos reservados.
					</p>
					<div className='flex items-center space-x-4'>
						<span className='text-light-secondary text-caption-2 cursor-pointer duration-300 hover:text-primary'>
							Términos y Condiciones
						</span>
						<span className='text-light-secondary text-caption-2 cursor-pointer duration-300 hover:text-primary'>
							Política de Privacidad
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
