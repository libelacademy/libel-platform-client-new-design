/** @format */

import React from 'react';
import backgroundHome from '@/assets/images/bg-home.jpg';

const Header = () => {
	return (
		<header className='relative w-full h-[750px] bg-light-secondary'>
			<figure className='absolute top-0 lef-0 w-full h-full'>
				<img
					src={backgroundHome}
					alt='Header'
					className='w-full h-full object-cover object-center'
				/>
			</figure>
			<div className='relative z-[1] w-full h-full pt-8 bg-[#343444]/50'>
				<div className='w-full max-w-3xl h-full flex flex-col items-center justify-center mx-auto'>
					<h2 className='text-heading-2 text-center text-white mb-8'>
						Discover, and collect{' '}
						<span className='text-white-stroke'>extraordinary</span>{' '}
						Monster NFTs
					</h2>
					<p className='font-normal text-center text-white text-heading-6'>
						Marketplace for monster character cllections non fungible
						token NFTs
					</p>
				</div>
			</div>
		</header>
	);
};

export default Header;
