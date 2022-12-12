/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
	return (
		<div className='w-full md:1/2 lg:w-1/3 xl:w-1/4  md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] xl:flex-[0_0_25%] px-[15px]'>
			<Link
				to={`/courses?category=${category.slug}`}
				className='relative group w-full max-w-sm p-3 rounded-xl bg-light-background-primary dark:bg-dark-background-secondary  flex items-center cursor-pointer duration-300 shadow-item mb-4 hover:transform hover:-translate-y-1'>
				<figure className='w-16 h-16 bg-[#C4C4C4] rounded-lg overflow-hidden mr-4'>
					<img
						src={category.image}
						alt={category.name}
						className='h-full object-cover'
					/>
				</figure>
				<div className='flex-1 flex items-center justify-between'>
					<h6 className='text-heading-6 text-light-onSurface dark:text-dark-onSurface group-hover:text-primary group-hover:dark:text-primary'>
						{category.name}
					</h6>
					<span className='min-w-[70px] text-center text-caption font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md'>
						{category.courses} {
							category.courses > 1 || category.courses === 0 ? 'cursos' : 'curso'
						}
					</span>
				</div>
			</Link>
		</div>
	);
};

export default CategoryCard;
