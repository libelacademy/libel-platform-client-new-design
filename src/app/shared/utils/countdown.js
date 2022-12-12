/** @format */

import dayjs from 'dayjs';

export const defaultReaminingTime = {
	seconds: '00',
	minutes: '00',
	hours: '00',
	days: '00',
};

export const getReaminingTime = (date) => {
	const timestamp = dayjs(date);
	const now = dayjs();

	if (timestamp.isBefore(now)) {
		return defaultReaminingTime;
	}

	return {
		seconds: getSeconds(now, timestamp),
		minutes: getMinutes(now, timestamp),
		hours: getHours(now, timestamp),
		days: getDays(now, timestamp),
	};
};

const getSeconds = (now, timestamp) => {
	const seconds = timestamp.diff(now, 'seconds') % 60;
	return fillZero(seconds, 2);
};

const getMinutes = (now, timestamp) => {
	const minutes = timestamp.diff(now, 'minutes') % 60;
	return fillZero(minutes, 2);
};

const getHours = (now, timestamp) => {
	const hours = timestamp.diff(now, 'hours') % 24;
	return fillZero(hours, 2);
};

const getDays = (now, timestamp) => {
	const days = timestamp.diff(now, 'days');
	return fillZero(days, 2);
};

const fillZero = (number, min) => {
	const str = number.toString();
	if (str.length < min) {
		return str.padStart(min, '0');
	}
	return str;
};
