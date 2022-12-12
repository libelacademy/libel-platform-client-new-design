/** @format */

import { Loading, VideoModal } from '@/app/shared/components';
import { useCallback, useEffect, useState } from 'react';
import {
	Outlet,
	ScrollRestoration,
	useNavigation,
} from 'react-router-dom';
import { Announcement, Footer, Navbar } from './components';

const General = () => {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);

	const getKey = useCallback((location, matches) => {
		let match = matches.find((match) => match.handle?.scrollMode);
		if (match?.handle?.scrollMode === 'pathname') {
			return location.pathname;
		}

		return location.key;
	}, []);

	useEffect(() => {
		if (navigation.state === 'loading') {
			document.body.style.overflow = 'hidden';
			setIsLoading(true);
		} else {
			document.body.style.overflow = 'unset';
			setIsLoading(false);
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [navigation]);

	return (
		<div className='relative w-full min-h-screen'>
			<VideoModal />
			<Announcement />
			<Navbar />
			<Loading isLoading={isLoading} />
			<Outlet />
			<Footer />
			<ScrollRestoration getKey={getKey} />
		</div>
	);
};

export default General;
