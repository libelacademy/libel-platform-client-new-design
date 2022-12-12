/** @format */

import { Input } from '@/app/shared/components';
import { updateAnnouncement } from '@/store/admin.slice';
import { setAnnouncement } from '@/store/general.sclie';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';

const Announcements = () => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		reset,
		watch,
	} = useForm();

	const { announcements, loading } = useSelector(
		(state) => state.admin,
	);
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		dispatch(updateAnnouncement(data))
			.unwrap()
			.then((response) => {
				reset();
				toast.success('Announcement updated successfully');
				dispatch(
					setAnnouncement({
						message: response.current.message,
						url: response.current.url,
						visible: true,
					}),
				);
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<main className='w-full  pb-7'>
			<Header title={'anuncios'} />
			<div className='bg-white shadow  rounded-lg'>
				<header className='w-full p-4 border-b '>
					<h2 className='text-heading-5'>Barra de Anuncios</h2>
				</header>
				<div className='p-4 flex flex-col lg:flex-row lg:gap-10'>
					<div className='w-full'>
						<h4 className='text-heading-6 mb-2'>Anuncio actual</h4>
						<div className='w-full h-8 bg-primary text-white rounded-md text-sm font-medium flex items-center justify-center'>
							<strong className='mr-2'>
								{announcements?.current.message}
							</strong>{' '}
							|{' '}
							<a
								href={announcements?.current.url}
								className='ml-2 hover:underline'>
								Ver más
							</a>
						</div>
						<div className='w-full h-px bg-gray-300 my-4' />
						<h4 className='text-heading-6 mb-2'>Nuevo anuncio</h4>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Input
								name='message'
								placeholder={'Mensaje'}
								register={register}
								errors={errors}
								type='text'
							/>
							<Input
								name='url'
								placeholder={'URL'}
								register={register}
								errors={errors}
								type='url'
							/>
							<button
								type='submit'
								disabled={loading}
								className='w-full inline-flex items-center justify-center md:max-w-xs rounded-md px-4 py-3 text-button bg-primary/10 text-primary hover:bg-primary/20'>
								{loading ? (
									<>
										<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
										Cargando...
									</>
								) : (
									'Actualizar'
								)}
							</button>
						</form>
						<div className='lg:hidden w-full h-px bg-gray-300 my-4' />
					</div>
					<div className='w-full lg:max-w-xs'>
						<div className='w-full bg-primary/10 p-2 rounded-md'>
							<h4 className='text-heading-6'>Historial</h4>
						</div>
						<ul className='flex flex-col lg:max-h-[400px] lg:overflow-y-auto divide-y divide-gray-200 px-2'>
							{announcements?.history.map((announcement) => (
								<li key={announcement._id} className='py-4'>
									<h5 className='w-full flex items-center justify-between text-body-2 font-bold'>
										{announcement.message}
									</h5>

									<a
										href={announcement.url}
										target='_blank'
										rel='noreferrer'
										className='text-body-3 text-gray-500 hover:text-primary hover:underline'>
										{announcement.url}
									</a>
									<p className='text-right text-caption-2 text-gray-500'>
										{new Date(
											announcement.createdAt,
										).toLocaleDateString()}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Announcements;
