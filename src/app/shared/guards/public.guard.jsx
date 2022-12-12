/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PublicGuard = () => {
	const { loggedIn } = useSelector((state) => state.auth);
	const location = useLocation();

	if (loggedIn) {
		return location.state?.from ? (
			<Navigate to={location.state?.from} replace />
		) : (
			<Navigate to='/platform' replace />
		);
	} else {
		return <Outlet />;
	}
};

export default PublicGuard;
