/** @format */

import { classnames } from '@/app/shared/utils';
import libelLogo from '@/assets/images/libel-logo.png';
import { logout } from '@/store/auth.slice';
import {
	RiBook2Line,
	RiDashboardLine,
	RiEmotionHappyLine,
	RiLogoutBoxLine,
	RiRadioButtonLine,
	RiSettings5Line,
	RiStackLine,
	RiTeamLine,
	RiUserSearchLine,
	RiUserSettingsLine,
	RiUserUnfollowLine,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
	const { user } = useSelector((state) => state.auth);
	const dispath = useDispatch();
	const navigate = useNavigate();

	const logOutHandler = () => {
		dispath(logout())
			.unwrap()
			.then((res) => {
				navigate('/login');
				toast.success(res.message);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<aside className='hidden 2xl:flex sticky top-0 bottom-0 left-0 z-10 flex-col w-72 h-screen 2xl:shadow-sidebar bg-dark-background-primary transition-all duration-300'>
			<div className='relative flex items-center p-[15px]'>
				<Link to='/' className='inline-block h-10'>
					<img
						src={libelLogo}
						alt='Libel'
						className='h-full object-cover'
					/>
				</Link>
			</div>
			<div className='flex-grow w-full flex flex-col p-[15px]'>
				<ul className='w-full divide-y divide-dark-background-secondary'>
					<div className='py-2'>
						<li className='w-full'>
							<NavLink
								to='/platform'
								end
								className={({ isActive }) =>
									classnames(
										'w-full px-3 py-4 flex items-center font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
										isActive
											? 'bg-dark-background-secondary text-white'
											: 'text-white-2',
									)
								}
							>
								<span className='flex items-center'>
									<RiDashboardLine className='w-5 h-5 mr-2' />
									Dashboard
								</span>
							</NavLink>
						</li>
					</div>
					{user?.role === 'student' && (
						<>
							<div className='py-2'>
								<li className='w-full'>
									<NavLink
										to='my-courses'
										className={({ isActive }) =>
											classnames(
												'w-full px-3 py-4 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
												isActive
													? 'bg-dark-background-secondary text-white'
													: 'text-white-2',
											)
										}
									>
										<span className='flex items-center'>
											<RiBook2Line className='w-5 h-5 mr-2' />
											Mis Cursos
										</span>
									</NavLink>
								</li>
							</div>
						</>
					)}
					{user?.role === 'admin' && (
						<>
							<div className='py-2'>
								<li className='w-full'>
									<NavLink
										to='users'
										className={({ isActive }) =>
											classnames(
												'w-full px-3 py-4 mb-2 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
												isActive
													? 'bg-dark-background-secondary text-white'
													: 'text-white-2',
											)
										}
									>
										<span className='flex items-center'>
											<RiTeamLine className='w-5 h-5 mr-2' />
											Usuarios
										</span>
									</NavLink>
								</li>
								<li className='w-full'>
									<NavLink
										to='categories'
										className={({ isActive }) =>
											classnames(
												'w-full px-3 py-4 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
												isActive
													? 'bg-dark-background-secondary text-white'
													: 'text-white-2',
											)
										}
									>
										<span className='flex items-center'>
											<RiStackLine className='w-5 h-5 mr-2' />
											Categorías
										</span>
									</NavLink>
								</li>
								<li className='w-full'>
									<NavLink
										to='courses'
										className={({ isActive }) =>
											classnames(
												'w-full px-3 py-4 mb-2 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
												isActive
													? 'bg-dark-background-secondary text-white'
													: 'text-white-2',
											)
										}
									>
										<span className='flex items-center'>
											<RiBook2Line className='w-5 h-5 mr-2' />
											Cursos
										</span>
									</NavLink>
								</li>
							</div>
							<div className='py-2'>
								<li className='w-full'>
									<NavLink
										to='avatars'
										className={({ isActive }) =>
											classnames(
												'w-full px-3 py-4 mb-2 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
												isActive
													? 'bg-dark-background-secondary text-white'
													: 'text-white-2',
											)
										}
									>
										<span className='flex items-center'>
											<RiEmotionHappyLine className='w-5 h-5 mr-2' />
											Avatars
										</span>
									</NavLink>
								</li>
								<li className='w-full'>
									<NavLink
										to='announcements'
										className={({ isActive }) =>
											classnames(
												'w-full px-3 py-4 mb-2 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
												isActive
													? 'bg-dark-background-secondary text-white'
													: 'text-white-2',
											)
										}
									>
										<span className='flex items-center'>
											<RiRadioButtonLine className='w-5 h-5 mr-2' />
											Anuncios
										</span>
									</NavLink>
								</li>
							</div>
						</>
					)}
					{user?.role === 'instructor' && (
						<div className='py-2'>
							<li className='w-full'>
								<NavLink
									to='courses'
									className={({ isActive }) =>
										classnames(
											'w-full px-3 py-4 mb-2 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
											isActive
												? 'bg-dark-background-secondary text-white'
												: 'text-white-2',
										)
									}
								>
									<span className='flex items-center'>
										<RiBook2Line className='w-5 h-5 mr-2' />
										Cursos
									</span>
								</NavLink>
							</li>
						</div>
					)}
					<div className='py-2'>
						<li className='w-full'>
							<NavLink
								to='settings'
								className={({ isActive }) =>
									classnames(
										'w-full px-3 py-4 flex items-center  font-medium hover:text-white hover:bg-dark-background-secondary/50 rounded-md transition-all duration-300',
										isActive
											? 'bg-dark-background-secondary text-white'
											: 'text-white-2',
									)
								}
							>
								<span className='flex items-center'>
									<RiSettings5Line className='w-5 h-5 mr-2' />
									Configuración
								</span>
							</NavLink>
						</li>
					</div>
					<div className='py-2'>
						<button
							onClick={() => logOutHandler()}
							className='mt-auto w-full px-3 py-4 bg-white-2 text-white text-button flex items-center rounded-md '
						>
							<RiLogoutBoxLine size={20} className='mr-4' />
							Cerrar Sesión
						</button>
					</div>
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
