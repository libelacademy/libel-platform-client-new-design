/** @format */

import { classnames } from '@/app/shared/utils';
import { toggleAnnouncement } from '@/store/general.sclie';
import React from 'react';
import { useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

const Announcement = () => {
	const { announcement } = useSelector((state) => state.general);
	const dispatch = useDispatch();

	return (
		<div
			className={classnames(
				'fixed w-full left-0 z-20 bg-primary text-white text-sm font-medium flex items-center justify-center h-8 duration-300',
				announcement.visible ? 'top-0' : '-top-8',
			)}>
			<button
				onClick={() => dispatch(toggleAnnouncement())}
				className='absolute right-4 flex items-center justify-center w-4 h-4 rounded-full bg-white/30 duration-300 hover:bg-white/50'>
				<RiCloseFill />
			</button>
			<strong className='mr-2'>{announcement.message}</strong> |{' '}
			<a href={announcement.url} className='ml-2 hover:underline'>
				Ver más
			</a>
		</div>
	);
};

export default Announcement;
