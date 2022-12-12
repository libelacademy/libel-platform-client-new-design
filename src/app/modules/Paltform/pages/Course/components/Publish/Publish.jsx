/** @format */

import { updateCourse } from '@/app/modules/Paltform/services';
import { uploadFile } from '@/app/modules/Paltform/services/file.service';
import { addCategorySchema } from '@/app/modules/Paltform/validations/category.validator';
import { Input } from '@/app/shared/components';
import { classnames } from '@/app/shared/utils';
import { addCategory } from '@/store/admin.slice';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { locale } from 'dayjs';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RiCheckLine, RiErrorWarningFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

const states = [
	{
		id: 1,
		value: 'draft',
		name: 'Borrador',
		description: 'El curso está en proceso de edición.',
	},
	{
		id: 2,
		value: 'pre-order',
		name: 'Pre lanzamiento',
		description: 'El curso se publicacrá próximamente.',
	},
	{
		id: 3,
		value: 'published',
		name: 'Publicado',
		description: 'El curso está publicado y disponible.',
	},
];

const Publish = ({ isOpen, closeModal, status, publishedAt, courseId }) => {

	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(
		states.find((state) => state.value === status),
	);
	const [publishedDate, setPublishedDate] = useState(publishedAt);
	const dispatch = useDispatch();

	const handleCloseModal = () => {
		closeModal();
	};

	const onSubmit = async () => {
		setLoading(true)
		const update = {
			status: selected.value,
			publishedAt:
				selected.value === 'pre-order'
					? publishedDate
					: new Date(),
		};
		console.log(update)
		const response = await updateCourse({
			id: courseId,
			course: update,
		})
		setLoading(false)
		if(response.success){
			toast.success('Curso actualizado con éxito')
			closeModal()
			location.reload()
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={handleCloseModal}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
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
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full md:min-w-[384px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-heading-5 text-gray-900'
								>
									Publicar Curso
								</Dialog.Title>
								<div className='mt-5'>
									<RadioGroup value={selected} onChange={setSelected}>
										<RadioGroup.Label className='sr-only'>
											Published Status
										</RadioGroup.Label>
										<div className='space-y-2'>
											{states.map((state) => (
												<RadioGroup.Option
													key={state.id}
													value={state}
													className={({ active, checked }) =>
														`${
															active
																? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary'
																: ''
														}
                  ${checked ? 'bg-primary/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
													}
												>
													{({ active, checked }) => (
														<>
															<div className='flex w-full items-center justify-between'>
																<div className='flex items-center'>
																	<div className='text-sm'>
																		<RadioGroup.Label
																			as='p'
																			className={`font-medium  ${
																				checked
																					? 'text-white'
																					: 'text-gray-900'
																			}`}
																		>
																			{state.name}
																		</RadioGroup.Label>
																		<RadioGroup.Description
																			as='span'
																			className={`inline ${
																				checked
																					? 'text-white'
																					: 'text-gray-500'
																			}`}
																		>
																			<span>{state.description}</span>
																		</RadioGroup.Description>
																	</div>
																</div>
																{checked && (
																	<div className='shrink-0 text-white'>
																		<RiCheckLine className='h-6 w-6' />
																	</div>
																)}
															</div>
														</>
													)}
												</RadioGroup.Option>
											))}
										</div>
									</RadioGroup>
									{selected.value === 'pre-order' && (
										<div className='w-full mt-3 pt-3 border-t'>
											<label
												htmlFor='publishedAt'
												className='font-bold'
											>
												Fecha de publiación
											</label>
											<input
												type='datetime-local'
												name='publisedAt'
												id='publisedAt'
												value={publishedDate}
												onChange={(e) =>
													setPublishedDate(e.target.value)
												}
												className='w-full border px-4 py-2 text-caption rounded-lg border-dark-secondary text-white-2 bg-white mt-2'
											/>
										</div>
									)}

									<div className='w-full flex items-center mt-4 gap-4'>
										<button
											type='button'
											onClick={() => onSubmit()}
											className='flex-1 flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-button bg-primary/10 text-primary duration-300 hover:bg-primary/30'
										>
											{loading ? (
												<>
													<div className='h-5 w-5 border-4 border-r-primary/50 rounded-full mr-2 animate-spin' />
													Cargando...
												</>
											) : (
												'Guardar'
											)}
										</button>
										<button
											type='button'
											className='flex-1 flex justify-center rounded-md border border-transparent px-4 py-2 text-button bg-primary text-white duration-300'
											onClick={handleCloseModal}
										>
											Cancelar
										</button>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Publish;
