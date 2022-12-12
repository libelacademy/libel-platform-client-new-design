/** @format */

import { classnames } from '@/app/shared/utils';
import React from 'react';

const Loading = ({ isLoading }) => {
	return (
		<div
			className={classnames(
				'fixed z-50 w-full h-screen bg-black/40 backdrop-blur-sm overflow-hidden flex items-center justify-center duration-150 transition-all',
				isLoading
					? 'opacity-100 visible'
					: 'opacity-0 invisible pointer-events-none',
			)}>
			<div className='w-full max-w-xs aspect-square rounded-full bg-light-background-primary dark:bg-dark-background-primary flex items-center justify-center pb-5'>
				<div className='loader-triangle-3'>
					<svg
						id='triangle'
						width='180px'
						height='180px'
						viewBox='-3 -4 39 39'>
						<polygon
							fill='transparent'
							stroke='#6000de'
							strokeWidth='2'
							points='16,0 32, 32 0,32 16,0'></polygon>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Loading;
