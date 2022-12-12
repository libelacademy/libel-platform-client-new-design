/** @format */

import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { classnames } from '@/app/shared/utils';

const CartMenu = ({ platform = false, size }) => {
	const { user } = useSelector((state) => state.auth);

	if (user?.role === 'student') {
		return (
			<Menu as='div' className='relative hidden lg:inline-block text-left ml-2'>
				<div>
					<Menu.Button
						className={classnames(
							'flex h-10 w-10 items-center justify-center rounded-md focus:outline-none duration-300',
							platform
								? 'text-black hover:bg-black/50 hover:text-white duration-300'
								: 'bg-black/30 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/50 text-white duration-300',
						)}>
						<RiShoppingCartLine size={size} />
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'>
					<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none'>
						{/* <div className='px-1 py-1 '></div> */}
						<div className='px-1 py-1 '>
							<Menu.Item>
								<div className='flex justify-center items-center rounded-md px-2 py-2'>
									<p className='text-gray-900'>Cart is empty</p>
								</div>
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		);
	}
};

export default CartMenu;
