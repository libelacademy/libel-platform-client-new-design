/** @format */
import { classnames } from '@/app/shared/utils';
import { deleteCategory } from '@/store/admin.slice';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const DeleteCategory = ({
	isOpen,
	closeModal,
	category,
	resetCategory,
}) => {
	const { loading } = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteCategory(category._id))
			.unwrap()
			.then(() => {
				toast.success(
					'Category deleted successfully',
				);
				closeModal();
				resetCategory();
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={closeModal}>
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
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-heading-5 text-gray-900'>
									Eliminar Catgoría
								</Dialog.Title>
								{category && (
									<div className='mt-2'>
										{category.courses.length === 0 ? (
											<p className='text-body-3 text-gray-500'>
												¿Estás seguro que deseas eliminar la categoría{' '}
												<span className='font-bold'>
													{category.name}
												</span>
												?
											</p>
										) : (
											<p className='text-body-3 text-gray-500'>
												Esta categoría tiene {category.courses.length}{' '}
												{category.courses.length > 1
													? 'cursos'
													: 'curso'}{' '}
												asociados, No puedes eliminarla.
											</p>
										)}
									</div>
								)}

								<div className='w-full flex items-center mt-4 gap-4'>
									<button
										type='submit'
										className={classnames(
											'flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button bg-red-100 text-red-500 duration-300 hover:bg-red-200',
											category?.courses.length > 0
												? 'cursor-not-allowed'
												: 'cursor-pointer',
										)}
										onClick={handleDelete}
										disabled={
											loading || category?.courses.length > 0
										}>
										{loading ? (
											<>
												<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
												Cargando...
											</>
										) : (
											'Eliminar categoría'
										)}
									</button>
									<button
										type='button'
										className='flex-1  inline-flex justify-center rounded-md text-button bg-red-500 px-4 py-2 font-medium text-white focus:outline-none'
										onClick={closeModal}>
										Cancelar
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default DeleteCategory;
