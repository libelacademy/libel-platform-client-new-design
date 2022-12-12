/** @format */

import React from 'react';

const Title = ({ title }) => {
	return (
		<h4 className='text-heading-4 text-light-onSurface dark:text-dark-onSurface text-center mb-10 flex flex-col items-center justify-center'>
			<span className='mb-4'>{title}</span>
			<div className='relative bg-primary h-1 w-20 after:content-[""] after:absolute after:w-3 after:h-3 after:rounded-full after:bg-primary after:-top-1 after:animate-line' />
		</h4>
	);
};

export default Title;
