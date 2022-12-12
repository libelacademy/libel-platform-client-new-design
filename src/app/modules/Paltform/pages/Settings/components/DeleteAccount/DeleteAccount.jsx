/** @format */

import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ConfrimDeleteAccount } from '../ConfrimDeleteAccount';

const DeleteAccount = () => {
	const { user } = useSelector((state) => state.auth);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	return (
		<>
			<ConfrimDeleteAccount
				isOpen={isConfirmOpen}
				closeModal={() => setIsConfirmOpen(false)}
			/>
			<div className='bg-white shadow  rounded-lg'>
				<header className='w-full p-[15px] border-b '>
					<h2 className='text-heading-5'>Eliminar Cuenta</h2>
				</header>
				<div className='w-full p-6 flex flex-col lg:flex-row gap-10 lg:gap-20'>
					{user &&
						(user.role === 'instructor' ? (
							<p>
								Para eliminar tu cuenta, por favor envía un correo
								electrónico a{' '}
								<a
									className='text-primary underline'
									href='mailto:info@libel.academy'>
									info@libel.academy
								</a>{' '}
								indicando la razón por la cual deseas eliminar tu
								cuenta de Instructor.
							</p>
						) : (
							<div className='w-full flex flex-col gap-10 lg:flex-row items-center justify-between'>
								<p className='text-base text-gray-500 mt-2 pl-4'>
									Al eliminar tu cuenta, perderás acceso a todos tus
									cursos y a tu perfil de usuario en Libel Academy.
									<br />
									Este proceso es
									<strong className='text-red-500'>
										{' '}
										irreversible
									</strong>
									.
								</p>
								<button 
									onClick={() => setIsConfirmOpen(true)}
									className='w-full max-w-sm rounded-full flex items-center justify-center text-button text-center py-3 bg-critical/10 hover:bg-critical/30 text-critical'>
									Eliminar cuenta
								</button>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default DeleteAccount;
