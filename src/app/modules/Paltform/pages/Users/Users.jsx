/** @format */

//  TODO: Filtros, Paginación, Busqueda en el Backend

import { classnames, countries } from '@/app/shared/utils';
import { Listbox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import {
	RiCheckLine,
	RiCodeSLine,
	RiDeleteBin6Line,
	RiUserAddLine,
	RiUserLine,
	RiUserSearchLine,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import { AddUser, ConfirmDeleteUser } from './components';

const Users = () => {
	const { users } = useSelector((state) => state.admin);
	const { user: authUser } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [roles] = useState([
		{ name: 'Todos los roles', value: 'all' },
		{ name: 'Administrador', value: 'admin' },
		{ name: 'Instructor', value: 'instructor' },
		{ name: 'Estudiante', value: 'student' },
	]);
	const [selectedUser, setSelectedUser] = useState({});
	const [selectedRole, setSelectedRole] = useState(roles[0]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [isAddUserOpen, setIsAddUserOpen] = useState(false);
	const [isConfirmDeleteUserOpen, setIsConfirmDeleteUserOpen] =
		useState(false);
	const [query, setQuery] = useState('');

	const handleSearch = (e) => {
		setQuery(e.target.value);
	};

	const SearchedUsers =
		query === ''
			? filteredUsers
			: filteredUsers.filter((user) =>
					user['name']
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, '')),
			  );

	const handleDeleteUser = (user) => {
		setSelectedUser(user);
		setIsConfirmDeleteUserOpen(true);
	};

	useEffect(() => {
		if (users) {
			setFilteredUsers(
				users.filter((user) => {
					if (selectedRole.value === 'all') return user;
					return user.role === selectedRole.value;
				}),
			);
		}
	}, [users, selectedRole]);

	return (
		<div className='w-full'>
			<AddUser
				isOpen={isAddUserOpen}
				closeModal={() => setIsAddUserOpen(false)}
			/>
			<ConfirmDeleteUser
				isOpen={isConfirmDeleteUserOpen}
				closeModal={() => setIsConfirmDeleteUserOpen(false)}
				user={selectedUser}
				instructors={
					users?.filter(
						(user) =>
							user.role === 'instructor' &&
							user._id !== selectedUser._id,
					) || []
				}
				resetUser={() => setSelectedUser({})}
			/>
			<Header title={'Usuarios'} />
			<div className='w-full mb-5 flex flex-col items-center gap-5'>
				<div className='w-full flex flex-col md:flex-row gap-3 items-center justify-between'>
					<Listbox value={selectedRole} onChange={setSelectedRole}>
						<div className='relative w-full md:max-w-[200px]'>
							<Listbox.Button className='w-full shadow bg-white text-light-secondary text-sub-title px-3 py-2 rounded-md flex items-center justify-between'>
								<span>{selectedRole.name}</span>
								<RiCodeSLine size={16} className='rotate-90' />
							</Listbox.Button>
							<Listbox.Options className='absolute z-10 -bottom-2 border border-dark-secondary  translate-y-full font-light py-1 mb-1 w-full   overflow-auto rounded-md bg-light-background-secondary  text-sm shadow-lg focus:outline-none'>
								{roles.map((role) => (
									<Listbox.Option
										key={role.value}
										value={role}
										className={({ active }) =>
											classnames(
												'cursor-pointer select-none relative py-2 pl-10 pr-4',
												active
													? 'bg-primary/20 text-primary dark:text-white'
													: 'text-white-2',
											)
										}>
										{({ selected, active }) => (
											<>
												<span
													className={classnames(
														selected
															? 'font-semibold'
															: 'font-normal',
														'block truncate',
													)}>
													{role.name}
												</span>
												{selected ? (
													<span
														className={classnames(
															active
																? 'text-white-2'
																: 'text-white-2',
															'absolute inset-y-0 left-0 flex items-center pl-3',
														)}>
														<RiCheckLine
															size={20}
															className='text-primary'
														/>
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</div>
					</Listbox>
					<div className='w-full md:max-w-sm shadow relative rounded-lg py-2 px-3 h-10 flex items-center text-white bg-white'>
						<RiUserSearchLine className='mr-2 text-black' />
						<input
							value={query}
							onChange={handleSearch}
							type='text'
							placeholder='Buscar usuario...'
							className='flex-1 text-[14px] text-black placeholder:text-white-2 placeholder:pl-1 focus:outline-none'
						/>
					</div>
				</div>

				<button
					onClick={() => setIsAddUserOpen(true)}
					className='w-full shadow md:w-auto ml-auto rounded-lg py-2 px-3 text-button text-primary bg-primary/10 hover:bg-primary/30 flex items-center justify-center'>
					<RiUserAddLine size={20} className='mr-3' />
					Añadir Usuario
				</button>
			</div>
			<div className='w-full relative shadow rounded-md overflow-hidden'>
				{users &&
					[...SearchedUsers]
						.sort((a, b) =>
							new Date(a.createdAt).getTime() <
							new Date(b.createdAt).getTime()
								? 1
								: -1,
						)
						?.map((user) => (
							<div
								key={user._id}
								className='lg:hidden relative w-full flex items-center justify-between bg-white py-3 px-4 border-b border-dark-secondary last:border-b-0'>
								<div
									onClick={() =>
										navigate(`/platform/users/${user._id}`)
									}
									className='w-full flex items-center'>
									<figure className='w-20 h-20 rounded-lg overflow-hidden bg-primary/70 mr-3'>
										<img
											src={user.avatar.url}
											alt={user.name}
											className='h-full object-cover'
										/>
									</figure>
									<div className='flex flex-col items-start'>
										<p className='text-base font-semibold'>
											{user.name}
										</p>
										<p className='text-sm leading-none text-gray-500 mb-2'>
											{user.email}
										</p>
										<span className='text-caption-2 font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md'>
											{
												roles.find((role) => role.value === user.role)
													.name
											}
										</span>
									</div>
								</div>
								{user.role !== 'admin' && (
									<>
										<button
											onClick={() => handleDeleteUser(user)}
											className='absolute right-4 z-[1] flex items-center justify-center text-button p-2 rounded-md bg-critical/10 text-critical hover:bg-critical/30  transtion-all duration-300'>
											<RiDeleteBin6Line className='w-5 h-5 ' />
										</button>
									</>
								)}
							</div>
						))}

				<table className='hidden lg:table w-full text-sm text-left text-gray-500'>
					<thead className='text-body-3 text-gray-700 uppercase bg-white border-b'>
						<tr>
							<th scope='col' className='py-3 px-6'>
								Nombre
							</th>
							<th
								scope='col'
								className='hidden lg:table-cell py-3 px-6'>
								Username
							</th>
							<th
								scope='col'
								className='hidden lg:table-cell py-3 px-6'>
								Email
							</th>
							<th scope='col' className='py-3 px-6'>
								Rol
							</th>
							<th
								scope='col'
								className='hidden xl:table-cell py-3 px-6'>
								País
							</th>
							<th
								scope='col'
								className='hidden 2xl:table-cell py-3 px-6'>
								Ingreso
							</th>
							<th scope='col' className='py-3 px-6'>
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							[...SearchedUsers]
								.sort((a, b) =>
									new Date(a.createdAt).getTime() <
									new Date(b.createdAt).getTime()
										? 1
										: -1,
								)
								?.map((user) => (
									<tr
										key={user._id}
										className=' bg-white border-b last:border-b-0 hover:bg-primary/5'>
										<td
											scope='row'
											className='flex items-center py-4 px-6 text-gray-900 whitespace-nowrap'>
											<figure className='w-14 h-14 rounded-lg overflow-hidden bg-primary/70 mr-3'>
												<img
													src={user.avatar.url}
													alt={user.name}
													className='h-full object-cover'
												/>
											</figure>
											<div className='flex flex-col'>
												<span className='text-base font-semibold'>
													{user.name}
												</span>
												<span className='lg:hidden text-sm text-gray-500'>
													{user.email}
												</span>
											</div>
										</td>
										<td className='hidden lg:table-cell py-4 px-6'>
											@{user.username}
										</td>
										<td className='hidden lg:table-cell py-4 px-6'>
											{user.email}
										</td>
										<td className='py-4 px-6'>
											{user.role === 'admin'
												? 'Administrador'
												: user.role === 'instructor'
												? 'Instructor'
												: 'Estudiante'}
										</td>
										<td className='hidden xl:table-cell py-4 px-6'>
											{
												countries.find(
													(country) => country.code === user.country,
												).name
											}
										</td>
										<td className='hidden 2xl:table-cell py-4 px-6'>
											{new Date(user.createdAt).toLocaleDateString()}
										</td>
										<td className='py-4 px-6 space-x-2'>
											<button
												onClick={() =>
													navigate(`/platform/users/${user._id}`)
												}
												className='inline-flex items-center justify-center text-button py-1 px-2 rounded-md bg-primary/10 text-primary hover:bg-primary/30 transtion-all duration-300'>
												<RiUserLine className='w-5 h-5 mr-1' />
												Detalles
											</button>
											{user._id !== authUser._id && (
												<>
													<button
														onClick={() => handleDeleteUser(user)}
														className='inline-flex items-center justify-center text-button py-1 px-2 rounded-md bg-critical/10 text-critical hover:bg-critical/30  transtion-all duration-300'>
														<RiDeleteBin6Line className='w-5 h-5 mr-1' />
														Eliminar
													</button>
												</>
											)}
										</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
