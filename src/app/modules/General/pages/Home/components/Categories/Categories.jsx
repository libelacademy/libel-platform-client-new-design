/** @format */

import { CategoryCard } from '@/app/modules/General/components/CategoryCard';
import { Title } from '@/app/modules/General/components/Title';
import React from 'react';

const Categories = ({ categories }) => {
	return (
		<section className='section bg-light-background-secondary dark:bg-dark-background-footer'>
			<div className='container'>
				<Title title='Categorías' />
				<div className='flex flex-wrap'>
					{categories
						// .filter((category) => category.courses > 0)
						.map((category) => (
							<CategoryCard key={category._id} category={category} />
						))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
