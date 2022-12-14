/** @format */

import { uploadFile } from '@/app/modules/Paltform/services/file.service';
import { addCategorySchema } from '@/app/modules/Paltform/validations/category.validator';
import { Input } from '@/app/shared/components';
import { classnames } from '@/app/shared/utils';
import { addCategory } from '@/store/admin.slice';
import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

const AddCategory = ({ isOpen, closeModal }) => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
		reset,
		watch,
	} = useForm({
		resolver: yupResolver(addCategorySchema),
		defaultValues: {
			image: null,
		},
	});
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleCloseModal = () => {
		reset();
		closeModal();
	};

	const onSubmit = async (data) => {
		setLoading(true);
		const image = await uploadFile(data.image[0]);
		if (image) {
			try {
				dispatch(addCategory({ name: data.name, image: image._id }));
				toast.success('Category added successfully');
				setLoading(false);
				handleCloseModal();
			} catch (error) {
				toast.error(error.message);
			}
		} else {
			setLoading(false);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={handleCloseModal}>
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
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full md:min-w-[384px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-heading-5 text-gray-900'>
									A??adir Categor??a
								</Dialog.Title>
								<div className='mt-5 mx-auto w-full max-w-sm px-4 py-3 rounded-xl flex items-center shadow-item'>
									<figure className='w-16 h-16 bg-[#C4C4C4] rounded-lg overflow-hidden mr-4'>
										{watch('image') && (
											<img
												src={URL.createObjectURL(watch('image')[0])}
												alt={watch('name')}
												className='h-full object-cover'
											/>
										)}
									</figure>
									<h6 className='text-heading-5 text-light-onSurface dark:text-dark-onSurface group-hover:text-primary group-hover:dark:text-primary'>
										{watch('name')}
									</h6>
								</div>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className='mt-5'>
									<Input
										name={'name'}
										placeholder='Categor??a'
										errors={errors}
										register={register}
									/>
									<div className='relative w-full mb-2 pb-6'>
										{errors.image && (
											<span className='absolute right-2 top-6 -translate-y-1/2 text-critical'>
												<RiErrorWarningFill size={20} />
											</span>
										)}
										<input
											className={classnames(
												'w-full bg-transparent text-caption rounded-lg focus:outline-none file:bg-primary/10 file:text-primary file:hover:bg-primary/20 file:border-0 file:px-5 file:py-3 file:cursor-pointer file:mr-4 border',
												errors.image
													? 'border-critical text-critical'
													: 'border-dark-secondary dark:border-dark-background-secondary text-white-2 bg-white dark:bg-transparent',
											)}
											type='file'
											placeholder='Selecciona una imagen'
											accept='image/*'
											{...register('image')}
										/>
										<p className='absolute right-0 pt-1 text-caption-2 text-critical text-right'>
											{errors.image && errors.image.message}
										</p>
									</div>
									<div className='w-full flex items-center mt-4 gap-4'>
										<button
											type='submit'
											className='flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button bg-primary/10 text-primary duration-300 hover:bg-primary/30'>
											{loading ? (
												<>
													<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
													Cargando...
												</>
											) : (
												'A??adir categor??a'
											)}
										</button>
										<button
											type='button'
											className='flex-1 flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-primary text-white duration-300'
											onClick={handleCloseModal}>
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

export default AddCategory;
