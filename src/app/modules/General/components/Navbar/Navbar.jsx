/** @format */

import { CartMenu, UserMenu } from '@/app/shared/components';
import { classnames } from '@/app/shared/utils';
import libelLogo from '@/assets/images/libel-logo.png';
import { toggleTheme } from '@/store/general.sclie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
	const { announcement, theme } = useSelector(
		(state) => state.general,
	);
	const { loggedIn } = useSelector((state) => state.auth);
	const [isTop, setIsTop] = useState(true);
	const dispatch = useDispatch();

	const controlNavbar = () => {
		if (window.scrollY > 0) {
			setIsTop(false);
		} else {
			setIsTop(true);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);

		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, []);

	// TODO: Add menu button

	return (
		<div
			className={classnames(
				'fixed z-20  left-0 w-full transition-all duration-300 ease-in-out',
				announcement.visible ? 'top-8' : 'top-0',
				isTop
					? 'bg-transparent duration-300'
					: 'bg-black/40 shadow backdrop-blur-md duration-300 ',
			)}>
			<div className='container px-[15px] py-4 flex items-center justify-between'>
				<div className='relative z-10 flex items-center'>
					<Link to='/' className='inline-block h-8 md:h-10'>
						<img
							src={libelLogo}
							alt='Libel'
							className='h-full object-cover'
						/>
					</Link>
				</div>
				<div className='flex'>
					<ul className='hidden lg:flex items-center ml-auto'>
						<li className='h-full flex items-center  ml-2'>
							<NavLink
								end
								to='/courses'
								className={({ isActive }) =>
									classnames(
										'realtive font-bold text-button px-5 w-[100px] max-w-none h-10 rounded-md flex items-center justify-center duration-300',
										isActive
											? 'bg-white text-black'
											: 'bg-black/30 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/50 text-white',
									)
								}>
								Cursos
							</NavLink>
						</li>
						{!loggedIn && (
							<>
								<li className='h-full flex items-center ml-2'>
									<NavLink
										end
										to='/login'
										className={({ isActive }) =>
											classnames(
												'realtive font-bold  text-button h-10 w-[100px] max-w-none  rounded-md flex items-center justify-center duration-300',
												isActive
													? 'bg-white text-black'
													: 'bg-black/30 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/50 text-white',
											)
										}>
										Ingresar
									</NavLink>
								</li>
								<li className='h-full flex items-center ml-2'>
									<NavLink
										end
										to='/register'
										className={({ isActive }) =>
											classnames(
												'realtive font-bold text-button h-10 w-[100px] max-w-none  rounded-md flex items-center justify-center duration-300',
												isActive
													? 'bg-white text-black'
													: 'bg-black/30 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/50 text-white',
											)
										}>
										Registro
									</NavLink>
								</li>
							</>
						)}
					</ul>
					{loggedIn && (
						<>
							<CartMenu size={20} />
							<UserMenu />
						</>
					)}
					<div className='hidden lg:flex ml-2'>
						<button
							onClick={() => dispatch(toggleTheme())}
							className='w-10 h-10 rounded-md bg-black/30 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/50'>
							{theme === 'light' ? '🌞' : '🌚'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
