/** @format */

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminGuard = () => {
	const { role } = useSelector((state) => state.auth.user);

	return role !== 'admin' ? (
		<Navigate to='/platform' replace />
	) : (
		<Outlet />
	);
};

export default AdminGuard;
