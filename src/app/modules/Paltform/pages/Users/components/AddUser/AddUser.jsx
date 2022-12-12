/** @format */

import {
	Input,
	SelectCountry,
	SelectRole,
} from '@/app/shared/components';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { RiKey2Line } from 'react-icons/ri';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUserSchema } from '@/app/modules/Paltform/validations/user.validator';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/store/admin.slice';
import { toast } from 'react-hot-toast';

const AddUser = ({ isOpen, closeModal }) => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(addUserSchema),
	});

	const { loading } = useSelector((state) => state.admin);
	const [generatedPassword, setGeneratedPassword] = useState('');
	const dispatch = useDispatch();

	const generatePassword = () => {
		const password =
			Math.random().toString(36).slice(2) +
			Math.random().toString(36).slice(2);
		setGeneratedPassword(password);
		setValue('password', password, { shouldValidate: true });
	};

	const onSubmit = (data) => {
		const { name, lastName, ...newUser } = data;
		newUser.name = `${name} ${lastName}`;
		dispatch(addUser(newUser))
			.unwrap()
			.then((res) => {
				toast.success(res.message);
				setGeneratedPassword('')
				reset();
				closeModal();
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-20' onClose={() => null}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto'>
					<div className='w-full min-h-full flex flex-col items-center justify-center p-4 text-center'>
						<Transition.Child
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='block w-full md:w-[448px] max-w-md transform overflow-hidden rounded-[20px] bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h4'
									className='text-heading-5 mb-10'>
									Añadir nuevo usuario
								</Dialog.Title>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className='w-full'>
									<div className='w-full flex items-start gap-4'>
										<Input
											name='name'
											placeholder={'Nombre'}
											register={register}
											errors={errors}
											type='text'
										/>
										<Input
											name='lastName'
											placeholder={'Apellido'}
											register={register}
											errors={errors}
											type='text'
										/>
									</div>
									<Input
										name='email'
										placeholder={'Correo electrónico'}
										register={register}
										errors={errors}
										type='email'
									/>
									<div className='w-full flex items-start gap-4'>
										<Input
											name='password'
											placeholder={'Contraseña'}
											register={register}
											errors={errors}
											type='password'
											value={generatedPassword}
										/>
										<button
											type='button'
											onClick={generatePassword}
											className='text-primary p-3 rounded-md aspect-square bg-primary/10 hover:bg-primary/30'>
											<RiKey2Line className='h-6 w-6' />
										</button>
									</div>
									<SelectRole
										name='role'
										register={register}
										setValue={setValue}
										errors={errors}
									/>
									<SelectCountry
										name='country'
										register={register}
										setValue={setValue}
									/>
									<Input
										name='phone'
										placeholder={'Teléfono'}
										register={register}
										errors={errors}
										type='text'
									/>
									<div className='w-full mt-4 flex gap-4'>
										<button
											type='submit'
											className='flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button bg-primary/10 text-primary duration-300 hover:bg-primary/30'>
											{loading ? (
												<>
													<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
													Cargando...
												</>
											) : (
												'Añadir usuario'
											)}
										</button>
										<button
											type='button'
											className='flex-1 flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-primary text-white duration-300'
											onClick={() => {
												reset();
												closeModal();
											}}>
											Cancelar
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default AddUser;
