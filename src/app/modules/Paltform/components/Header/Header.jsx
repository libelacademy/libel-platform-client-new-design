/** @format */

import { classnames } from '@/app/shared/utils';
import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = ({ dashboard = false, title, predecessor }) => {
	return (
		<header className='w-full flex flex-col lg:flex-row gap-4 items-center justify-between mb-10'>
			<h2 className='text-heading-3 capitalize'>
				{dashboard ? 'dashboard ' : title}
			</h2>
			<div className='flex items-center space-x-3'>
				<Link to='/'>
					<RiHome3Line className='w-5 h-5' />
				</Link>
				<span>/</span>
				{dashboard ? (
					<span className='text-button text-white-2 capitalize'>
						dashbaord
					</span>
				) : (
					<>
						<Link to='/platform' className='text-button'>
							Dashboard
						</Link>
						{predecessor && (
							<>
							<span>/</span>
								<Link to={predecessor.url} className='text-button'>
									<span className='capitalize'>
										{predecessor.label}
									</span>
								</Link>
							</>
						)}
						<span className={predecessor ? 'hidden' : ''}>/</span>
						<span className={
							classnames(
								'text-button text-white-2 capitalize',
								predecessor ? 'hidden' : ''
							)
						}>
							{title}
						</span>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
