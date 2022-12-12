/** @format */

import React from 'react';

import libelWatermark from '@/assets/images/libel-watermark.png';

const Fallback = () => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<img
				src={libelWatermark}
				alt='Libel Watermark'
				className='w-full max-w-xs'
			/>
		</div>
	);
};

export default Fallback;
