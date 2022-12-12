/** @format */

import { classnames } from '@/app/shared/utils';
import { Listbox, Transition } from '@headlessui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Header } from '../../components';
import { CourseCard } from '../../components/CourseCard';
import { fetchCategories, fetchCourses } from '../../services';

const sortOptions = [
	{ name: 'Recientes', value: 'newest' },
	{ name: 'Antiguos', value: 'oldest' },
	{ name: 'Mayor precio', value: 'high' },
	{ name: 'Menor precio', value: 'low' },
	{ name: 'Destacados', value: 'liked' },
];

const Courses = () => {
	const { courses, categories, category } = useLoaderData();

	const navigate = useNavigate();
	const [filteredCourses, setFilteredCourses] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sort, setSort] = useState(sortOptions[0]);

	const handleCategoryChange = (category) => {
		console.log(category);
		if (category === 'all') {
			navigate(`/courses`);
		} else {
			navigate(`/courses?category=${category.slug}`);
		}
	};

	useEffect(() => {
		setFilteredCourses(courses);
		setSelectedCategory(
			categories.find((c) => c.slug === category) || 'all',
		);
		// console.log(categories.find(c => c.slug === category) || 'all');
	}, [courses]);

	useEffect(() => {
		if (sort.value) {
			if (sort.value === 'newest') {
				setFilteredCourses((prev) =>
					[...prev].sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
					),
				);
			} else if (sort.value === 'oldest') {
				setFilteredCourses((prev) =>
					[...prev].sort(
						(a, b) => new Date(a.createdAt) - new Date(b.createdAt),
					),
				);
			} else if (sort.value === 'high') {
				setFilteredCourses((prev) =>
					[...prev].sort((a, b) => b.price - a.price),
				);
			} else if (sort.value === 'low') {
				setFilteredCourses((prev) =>
					[...prev].sort((a, b) => a.price - b.price),
				);
			} else if (sort.value === 'liked') {
				setFilteredCourses((prev) =>
					[...prev].sort((a, b) => b.likes - a.likes),
				);
			}
		}
	}, [sort]);

	return (
		<main>
			<Header title={'Nuestros Cursos'} />
			<section className='section'>
				<div className='container'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-5 px-[15px] mb-10'>
						<Listbox
							value={selectedCategory}
							onChange={handleCategoryChange}>
							<div className='relative z-[11] w-full md:max-w-[260px]'>
								<Listbox.Button className='bg-light-background-secondary dark:bg-dark-background-secondary text-light-secondary dark:text-white text-body-3 h-12 w-full px-4 py-3 rounded-md flex items-center justify-between'>
									<span className='whitespace-nowrap truncate'>
										{selectedCategory === 'all'
											? 'Categorías'
											: selectedCategory.name}
									</span>
									<span className='w-6 h-full flex items-center justify-center'>
										<RiArrowDownSFill size={20} />
									</span>
								</Listbox.Button>
								<Transition
									leave='transition ease-in duration-100'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'>
									<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-background-secondary dark:bg-dark-background-secondary py-1 text-sm shadow-[0_4px_4px_rgba(28,24,24,0.25)] '>
										<Listbox.Option
											value={'all'}
											className={({ active }) =>
												classnames(
													'relative cursor-pointer select-none py-2 px-2',
													active
														? 'bg-primary/10 text-primary'
														: 'text-dark-background-primary dark:text-white',
												)
											}>
											{({ selected }) => (
												<span
													className={classnames(
														'block truncate',
														selected
															? 'font-bold text-primary'
															: 'font-normal',
													)}>
													Todas
												</span>
											)}
										</Listbox.Option>
										{categories.map((category) => (
											<Listbox.Option
												key={category._id}
												value={category}
												className={({ active }) =>
													classnames(
														'relative cursor-pointer select-none py-2 px-2',
														active
															? 'bg-primary/10 text-primary'
															: 'text-dark-background-primary dark:text-white',
													)
												}>
												{({ selected }) => (
													<span
														className={classnames(
															'block truncate',
															selected
																? 'font-bold text-primary'
																: 'font-normal',
														)}>
														{category.name}
													</span>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
						{filteredCourses.length > 0 && (
							<div className='flex flex-col md:flex-row items-center justify-end gap-2 md:gap-4 w-full '>
								<span className='text-dark-background-primary dark:text-white'>
									Ordenar:
								</span>
								<Listbox value={sort} onChange={setSort}>
									<div className='relative z-10 w-full md:max-w-[260px]'>
										<Listbox.Button className='bg-light-background-secondary dark:bg-dark-background-secondary text-light-secondary dark:text-white text-body-3  h-12 w-full px-4 py-3 rounded-md flex items-center justify-between'>
											<span className='whitespace-nowrap truncate'>
												{sort.name}
											</span>
											<span className='w-6 h-full flex items-center justify-center'>
												<RiArrowDownSFill size={20} />
											</span>
										</Listbox.Button>
										<Transition
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'>
											<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-background-secondary dark:bg-dark-background-secondary py-1 text-sm shadow-[0_4px_4px_rgba(28,24,24,0.25)] '>
												{sortOptions.map((s) => (
													<Listbox.Option
														key={s.value}
														value={s}
														className={({ active }) =>
															classnames(
																'relative cursor-pointer select-none py-2 px-2',
																active
																	? 'bg-primary/10 text-primary'
																	: 'text-dark-background-primary dark:text-white',
															)
														}>
														{({ selected }) => (
															<span
																className={classnames(
																	'block truncate',
																	selected
																		? 'font-bold text-primary'
																		: 'font-normal',
																)}>
																{s.name}
															</span>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</div>
						)}
					</div>
					<div className='grid md:grid-cols-2 lg:grid-cols-4'>
						{filteredCourses.length > 0 ? (
							filteredCourses.map((course) => (
								<CourseCard key={course._id} course={course} />
							))
						) : (
							<div className='col-span-4 text-center w-full'>
								<h3 className='text-heading-3  text-light-onSurface dark:text-dark-onSurface'>
									No hay cursos disponibles
								</h3>
							</div>
						)}
					</div>
				</div>
			</section>
		</main>
	);
};

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const query = url.searchParams.get('category');
	const courses = await fetchCourses(query);
	const categories = await fetchCategories();

	return {
		courses,
		categories,
		category: query,
	};
};

export default Courses;
