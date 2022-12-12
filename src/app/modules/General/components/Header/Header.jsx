/** @format */

import React from 'react';
import { useSelector } from 'react-redux';

import background from '@/assets/images/bg-header.jpg';
import backgroundDark from '@/assets/images/bg-header-2.jpg';
import { Link } from 'react-router-dom';

const Header = ({ title, breadcrumbs }) => {
	const { theme } = useSelector((state) => state.general);

	return (
		<header className='relative w-full h-[296px] duration-300'>
			<figure className='absolute top-0 lef-0 w-full h-full'>
				<img
					src={theme === 'light' ? background : backgroundDark}
					alt='Header'
					className='w-full h-full object-cover'
				/>
			</figure>
			<div className='relative z-[1] w-full h-full flex flex-col items-center justify-center pt-20 bg-[#343444]/10'>
				<h3 className='text-heading-3 font-bold placeholder:mb-3 capitalize text-white text-center'>
					{title}
				</h3>
				<div className='hidden md:flex items-center'>
					<Link
						to='/'
						className='text-body-2 text-white-2 hover:text-white capitalize'>
						Inicio
					</Link>
					{breadcrumbs &&
						[...breadcrumbs]
							.sort((a, b) => a.position - b.position)
							.map((breadcrumb) => (
								<div
									key={breadcrumb.position}
									className='flex items-center'>
									<div
										key={breadcrumb.position}
										className='flex items-center'>
										<div
											key={breadcrumb.position}
											className='flex items-center'>
											<span className='text-body-2 text-white-2 mx-3'>
												/
											</span>
											<Link
												to={`/${breadcrumb.path}`}
												className='text-body-2 text-white-2 hover:text-white capitalize'>
												{breadcrumb.label}
											</Link>
										</div>
									</div>
								</div>
							))}
					<div className='flex items-center'>
						<span className='text-body-2 text-white-2 mx-3'>/</span>
						<span className='text-body-2 text-white capitalize'>
							{title}
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
