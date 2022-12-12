/** @format */

import React from 'react';
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
		<p className='text-light-onSurface dark:text-dark-onSurface text-heading-6'>
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
				{remainingTime.seconds}
			</span>
		</p>
	);
};

export default Countdown;
