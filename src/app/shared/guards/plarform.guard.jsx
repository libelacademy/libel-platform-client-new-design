/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PlatformGuard = () => {
	const { loggedIn } = useSelector((state) => state.auth);
	const location = useLocation();

	if (!loggedIn) {
		return (
			<Navigate
				to='/login'
				state={{
					from: location.pathname,
				}}
			/>
		);
	} else {
		return <Outlet />;
	}
};

export default PlatformGuard;
