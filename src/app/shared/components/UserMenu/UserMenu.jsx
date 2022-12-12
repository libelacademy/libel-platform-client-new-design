/** @format */

import { classnames } from '@/app/shared/utils';
import { logout } from '@/store/auth.slice';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { toast } from 'react-hot-toast';
import {
	RiBook2Line,
	RiBookOpenLine,
	RiDashboardLine,
	RiEmotionHappyLine,
	RiHome3Line,
	RiLogoutBoxRLine,
	RiRadioButtonLine,
	RiSettings5Line,
	RiStackLine,
	RiTeamLine,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ platform = false }) => {
	const { user } = useSelector((state) => state.auth);
	const dispath = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
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
		<Menu as='div' className='relative inline-block text-left ml-4'>
			<div>
				<Menu.Button className='flex items-center justify-end text-right'>
					<div className='flex flex-col'>
						<span
							className={classnames(
								'text-button leading-none',
								platform ? 'text-black' : 'text-white',
							)}>
							{user?.name}
						</span>
						<span
							className={classnames(
								'text-caption leading-none',
								platform ? 'text-light-secondary' : 'text-white',
							)}>
							{user?.role}
						</span>
					</div>
					<figure className='w-10 h-10 bg-white-2 rounded-lg overflow-hidden ml-4'>
						<img
							src={user?.avatar.url}
							alt={user?.name}
							className='h-full object-cover'
						/>
					</figure>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'>
				<Menu.Items className='absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg focus:outline-none'>
					<div className='px-1 py-1 '>
						<Menu.Item>
							{({ active }) => (
								<Link
									to='/'
									className={`${
										active ? 'bg-primary text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-button font-normal`}>
									{active ? (
										<RiHome3Line
											className='mr-2 h-5 w-5 '
											aria-hidden='true'
										/>
									) : (
										<RiHome3Line
											className='mr-2 h-5 w-5 text-primary'
											aria-hidden='true'
										/>
									)}
									Inicio
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Link
									to='/courses'
									className={`${
										active ? 'bg-primary text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-button font-normal`}>
									{active ? (
										<RiBookOpenLine
											className='mr-2 h-5 w-5 '
											aria-hidden='true'
										/>
									) : (
										<RiBookOpenLine
											className='mr-2 h-5 w-5 text-primary'
											aria-hidden='true'
										/>
									)}
									Cursos
								</Link>
							)}
						</Menu.Item>
					</div>
					<div className='px-1 py-1 '>
						<Menu.Item>
							{({ active }) => (
								<NavLink
									to='/platform'
									end
									className={({ isActive }) =>
										classnames(
											'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
											isActive
												? 'bg-primary text-white'
												: 'text-gray-900',
										)
									}>
									{({ isActive }) => (
										<>
											{isActive ? (
												<RiDashboardLine
													className='mr-2 h-5 w-5 text-white'
													aria-hidden='true'
												/>
											) : active ? (
												<RiDashboardLine
													className='mr-2 h-5 w-5 text-white'
													aria-hidden='true'
												/>
											) : (
												<RiDashboardLine
													className='mr-2 h-5 w-5 text-primary'
													aria-hidden='true'
												/>
											)}
											Dashboard
										</>
									)}
								</NavLink>
							)}
						</Menu.Item>
					</div>
					{
						user.role === 'student' && (
							<div className='px-1 py-1 '>
								<Menu.Item>
									{({ active }) => (
										<NavLink
											to='/platform/my-courses'
											end
											className={({ isActive }) =>
												classnames(
													'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
													isActive
														? 'bg-primary text-white'
														: 'text-gray-900',
												)
											}>
											{({ isActive }) => (
												<>
													{isActive ? (
														<RiBook2Line
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : active ? (
														<RiBook2Line
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : (
														<RiBook2Line
															className='mr-2 h-5 w-5 text-primary'
															aria-hidden='true'
														/>
													)}
													Mis Cursos
												</>
											)}
										</NavLink>
									)}
								</Menu.Item>
							</div>
						)
					}
					{user.role === 'admin' && (
						<>
							<div className='px-1 py-1 '>
								<Menu.Item>
									{({ active }) => (
										<NavLink
											to='/platform/users'
											end
											className={({ isActive }) =>
												classnames(
													'group flex w-full text-whtie items-center rounded-md px-2 py-2 mb-1 text-button font-normal hover:bg-primary hover:text-white',
													isActive
														? 'bg-primary text-white'
														: 'text-gray-900',
												)
											}>
											{({ isActive }) => (
												<>
													{isActive ? (
														<RiTeamLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : active ? (
														<RiTeamLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : (
														<RiTeamLine
															className='mr-2 h-5 w-5 text-primary'
															aria-hidden='true'
														/>
													)}
													Usuarios
												</>
											)}
										</NavLink>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<NavLink
											to='/platform/categories'
											end
											className={({ isActive }) =>
												classnames(
													'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
													isActive
														? 'bg-primary text-white'
														: 'text-gray-900',
												)
											}>
											{({ isActive }) => (
												<>
													{isActive ? (
														<RiStackLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : active ? (
														<RiStackLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : (
														<RiStackLine
															className='mr-2 h-5 w-5 text-primary'
															aria-hidden='true'
														/>
													)}
													Categorías
												</>
											)}
										</NavLink>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<NavLink
											to='/platform/courses'
											end
											className={({ isActive }) =>
												classnames(
													'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
													isActive
														? 'bg-primary text-white'
														: 'text-gray-900',
												)
											}>
											{({ isActive }) => (
												<>
													{isActive ? (
														<RiBook2Line
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : active ? (
														<RiBook2Line
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : (
														<RiBook2Line
															className='mr-2 h-5 w-5 text-primary'
															aria-hidden='true'
														/>
													)}
													Cursos
												</>
											)}
										</NavLink>
									)}
								</Menu.Item>
							</div>
							<div className='px-1 py-1 '>
								<Menu.Item>
									{({ active }) => (
										<NavLink
											to='/platform/avatars'
											end
											className={({ isActive }) =>
												classnames(
													'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
													isActive
														? 'bg-primary text-white'
														: 'text-gray-900',
												)
											}>
											{({ isActive }) => (
												<>
													{isActive ? (
														<RiEmotionHappyLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : active ? (
														<RiEmotionHappyLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : (
														<RiEmotionHappyLine
															className='mr-2 h-5 w-5 text-primary'
															aria-hidden='true'
														/>
													)}
													Avatars
												</>
											)}
										</NavLink>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<NavLink
											to='/platform/announcements'
											end
											className={({ isActive }) =>
												classnames(
													'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
													isActive
														? 'bg-primary text-white'
														: 'text-gray-900',
												)
											}>
											{({ isActive }) => (
												<>
													{isActive ? (
														<RiRadioButtonLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : active ? (
														<RiRadioButtonLine
															className='mr-2 h-5 w-5 text-white'
															aria-hidden='true'
														/>
													) : (
														<RiRadioButtonLine
															className='mr-2 h-5 w-5 text-primary'
															aria-hidden='true'
														/>
													)}
													Anuncios
												</>
											)}
										</NavLink>
									)}
								</Menu.Item>
							</div>
						</>
					)}
					{user.role === 'instructor' && (
						<div className='px-1 py-1 '>
							<Menu.Item>
								{({ active }) => (
									<NavLink
										to='/platform/courses'
										end
										className={({ isActive }) =>
											classnames(
												'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
												isActive
													? 'bg-primary text-white'
													: 'text-gray-900',
											)
										}>
										{({ isActive }) => (
											<>
												{isActive ? (
													<RiBook2Line
														className='mr-2 h-5 w-5 text-white'
														aria-hidden='true'
													/>
												) : active ? (
													<RiBook2Line
														className='mr-2 h-5 w-5 text-white'
														aria-hidden='true'
													/>
												) : (
													<RiBook2Line
														className='mr-2 h-5 w-5 text-primary'
														aria-hidden='true'
													/>
												)}
												Cursos
											</>
										)}
									</NavLink>
								)}
							</Menu.Item>
						</div>
					)}
					<div className='px-1 py-1 '>
						<Menu.Item>
							{({ active }) => (
								<NavLink
									to='/platform/settings'
									end
									className={({ isActive }) =>
										classnames(
											'group flex w-full text-whtie items-center rounded-md px-2 py-2 text-button font-normal hover:bg-primary hover:text-white',
											isActive
												? 'bg-primary text-white'
												: 'text-gray-900',
										)
									}>
									{({ isActive }) => (
										<>
											{isActive ? (
												<RiSettings5Line
													className='mr-2 h-5 w-5 text-white'
													aria-hidden='true'
												/>
											) : active ? (
												<RiSettings5Line
													className='mr-2 h-5 w-5 text-white'
													aria-hidden='true'
												/>
											) : (
												<RiSettings5Line
													className='mr-2 h-5 w-5 text-primary'
													aria-hidden='true'
												/>
											)}
											Configuración
										</>
									)}
								</NavLink>
							)}
						</Menu.Item>
					</div>
					<div className='px-1 py-1 '>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={handleLogout}
									className={`${
										active ? 'bg-primary text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-button font-normal`}>
									{active ? (
										<RiLogoutBoxRLine
											className='mr-2 h-5 w-5 '
											aria-hidden='true'
										/>
									) : (
										<RiLogoutBoxRLine
											className='mr-2 h-5 w-5 text-primary'
											aria-hidden='true'
										/>
									)}
									Cerrar Sesión
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default UserMenu;
