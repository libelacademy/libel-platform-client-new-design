/** @format */

import { classnames } from '@/app/shared/utils';
import { useState } from 'react';
import {
	RiDeleteBin5Line,
	RiEdit2Line,
	RiMenuAddFill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import {
	AddCategory,
	DeleteCategory,
	EditCategory,
} from './components';

const Categories = () => {
	const { categories } = useSelector((state) => state.admin);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [showAddCategory, setShowAddCategory] = useState(false);
	const [showEditCategory, setShowEditCategory] = useState(false);
	const [showDeleteCategory, setShowDeleteCategory] = useState(false);

	return (
		<>
			<AddCategory
				isOpen={showAddCategory}
				closeModal={() => setShowAddCategory(false)}
			/>
			<DeleteCategory
				isOpen={showDeleteCategory}
				closeModal={() => setShowDeleteCategory(false)}
				category={selectedCategory}
				resetCategory={() => setSelectedCategory(null)}
			/>
			<EditCategory
				isOpen={showEditCategory}
				closeModal={() => setShowEditCategory(false)}
				category={selectedCategory}
			/>
			<div className='w-full'>
				<Header title={'Categorías'} />
				<div className='flex  w-full mb-5'>
					<button
						onClick={() => setShowAddCategory(true)}
						className='w-full shadow md:w-auto rounded-lg py-2 px-3 text-button text-primary bg-primary/10 hover:bg-primary/30 flex items-center justify-center'>
						<RiMenuAddFill size={20} className='mr-3' />
						Añadir Categoríar
					</button>
				</div>

				<div className='w-full flex flex-col lg:flex-row items-start gap-10'>
					<div className='w-full lg:w-full lg:max-w-sm lg:max-h-[648px] rounded-lg shadow bg-white overflow-y-auto'>
						{categories &&
							[...categories]
								.sort((a, b) =>
									new Date(a.createdAt).getTime() <
									new Date(b.createdAt).getTime()
										? 1
										: -1,
								)
								.map((category) => (
									<div
										key={category._id}
										className={`w-full border-b last:border-b-0 flex items-center justify-between px-3 py-2  cursor-pointer transition-all duration-300 ${
											selectedCategory?._id === category._id
												? 'bg-primary/10 text-primary font-semibold'
												: 'hover:bg-primary/10'
										}`}
										onClick={() => setSelectedCategory(category)}>
										<div className='flex items-center  whitespace-nowrap'>
											<figure className='w-16 h-16 rounded-lg overflow-hidden mr-4'>
												<img
													src={category.image}
													alt={category.name}
													className='w-full h-full object-cover'
												/>
											</figure>
											<h3 className='text-heading-5 font-bold'>
												{category.name}
											</h3>
										</div>
										<span className='min-w-[80px] text-button text-center px-2 py-1 rounded-md shadow-inner bg-blue-100 text-blue-700'>
											Cursos: {category.courses.length}
										</span>
									</div>
								))}
					</div>
					<div className='relative w-full lg:w-full lg:max-w-2xl'>
						<div className='w-full h-full flex flex-col'>
							{selectedCategory ? (
								<>
									<div className='w-full flex flex-col lg:flex-row items-center justify-between gap-5 mb-5'>
										<h3 className='text-heading-5 font-bold'>
											{selectedCategory.name}
										</h3>
										<div className='flex items-center gap-2'>
											<button
												onClick={() => setShowEditCategory(true)}
												className='px-2 py-1 rounded-md shadow flex items-center gap-2 text-button bg-amber-100 text-amber-500 hover:bg-amber-200 transition-all duration-300'>
												<RiEdit2Line size={20} />
												Editar
											</button>
											<button
												onClick={() => setShowDeleteCategory(true)}
												className='px-2 py-1 rounded-md shadow flex items-center gap-2 text-button bg-red-100 text-red-500 hover:bg-red-200 transition-all duration-300'>
												<RiDeleteBin5Line size={20} />
												Eliminar
											</button>
										</div>
									</div>
									<div className='w-full rounded-lg shadow p-2 bg-white '>
										{selectedCategory.courses?.length > 0 ? (
											selectedCategory.courses.map((course) => (
												<div
													key={course._id}
													className='w-full border-b last:border-b-0 flex items-center justify-between p-2 rounded-lg '>
													<div className='flex items-center'>
														<figure className='w-14 h-14 rounded-lg overflow-hidden mr-3'>
															<img
																src={course.image.url}
																alt={course.title}
																className='w-full h-full object-cover'
															/>
														</figure>
														<div>
															<h3 className='text-heading-5 font-bold'>
																{course.title}
															</h3>
															<p className='text-caption text-gray-500'>
																{course.instructor.name}
															</p>
														</div>
													</div>
													<span
														className={classnames(
															'hidden md:inline text-caption font-bold px-2 py-1 rounded-md',
															course.status === 'draft'
																? 'bg-amber-100 text-amber-700'
																: course.status === 'published'
																? 'bg-green-100 text-green-700'
																: 'bg-sky-100 text-sky-700',
														)}>
														{course.status === 'draft'
															? 'Borrador'
															: course.status === 'published'
															? 'Publicado'
															: 'Próximamente'}
													</span>
												</div>
											))
										) : (
											<div className='w-full h-full flex items-center justify-center'>
												<h3 className='text-lg font-bold text-gray-500'>
													No hay cursos en esta categoría
												</h3>
											</div>
										)}
									</div>
								</>
							) : (
								<h1 className='text-2xl text-center lg:text-left font-bold text-gray-500'>
									Selecciona una categoría
								</h1>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Categories;
