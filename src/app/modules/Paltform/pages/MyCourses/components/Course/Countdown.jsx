/** @format */

import React from 'react';
import { RiFireFill } from 'react-icons/ri';

import {
	defaultReaminingTime,
	getReaminingTime,
} from '@/app/shared/utils/countdown';
import { useState } from 'react';

const Countdown = ({ date }) => {
	const [remainingTime, setRemainingTime] = useState(
		defaultReaminingTime,
	);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const newRemainingTime = getReaminingTime(date);
			setRemainingTime(newRemainingTime);
		}, 1000);

		return () => clearInterval(interval);
	}, [date]);

	return (
		<div className='absolute w-3/5 h-9 bg-light-background-primary dark:bg-dark-background-secondary z-[1] bottom-3 left-1/2 -translate-x-1/2 rounded-md shadow flex items-center justify-center'>
			<RiFireFill
				size={20}
				className='text-primary mr-2 animate-pulse'
			/>
			<p className='text-body-2 font-bold text-light-onSurface dark:text-dark-onSurface'>
				<span className='inline-block w-[2ch]	text-center'>
					{remainingTime.days}
				</span>
				:
				<span className='inline-block w-[2ch]	text-center'>
					{remainingTime.hours}
				</span>
				:
				<span className='inline-block w-[2ch]	text-center'>
					{remainingTime.minutes}
				</span>
				:
				<span className='inline-block w-[2ch]	text-center'>
					{remainingTime.seconds}{' '}
				</span>
			</p>
		</div>
	);
};

export default Countdown;
