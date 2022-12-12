/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const RoleGuard = ({ roles }) => {
	const { role } = useSelector((state) => state.auth.user);
	return roles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to='/platform' replace />
	);
};

export default RoleGuard;
