/** @format */
import { session } from '@/store/auth.slice';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { General, Learn, Paltform } from './modules';
import {
	Course,
	Courses,
	ForgotPassword,
	Home,
	Login,
	Register,
} from './modules/General/pages';
import { loader as CourseLoader } from './modules/General/pages/Course/Course';
import { loader as CoursesLoader } from './modules/General/pages/Courses/Courses';
import { loader as HomeLoader } from './modules/General/pages/Home/Home';
import {
	Announcements,
	Avatars,
	Categories,
	Courses as AdminCourses,
	Dashboard,
	MyCourses,
	Settings,
	User,
	Users,
	// Course as AdminCourse
} from './modules/Paltform/pages';
import { loader as SettingsLoader } from './modules/Paltform/pages/Settings/Settings';
import { loader as UserLoader } from './modules/Paltform/pages/User/User';
import { loader as PlatformCoursesLoader } from './modules/Paltform/pages/Courses/Courses'

import AdminCourse, { loader as PlatformCourseLoader } from './modules/Paltform/pages/Course/Course'

import PublicGuard from './shared/guards/public.guard';
import PlatformGuard from './shared/guards/plarform.guard';
import { Fallback } from './shared/components';
import AdminGuard from './shared/guards/admin.guard';
import { useState } from 'react';
import {
	getAnnouncement,
	setAnnouncement,
} from '@/store/general.sclie';
import RoleGuard from './shared/guards/role.guard';

let router = createBrowserRouter([
	{
		path: '/',
		element: <General />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: HomeLoader,
			},
			{
				path: 'courses',
				element: <Courses />,
				loader: CoursesLoader,
			},
			{
				path: 'courses/:slug',
				element: <Course />,
				loader: CourseLoader,
			},
			{
				path: '',
				element: <PublicGuard />,
				children: [
					{
						path: 'login',
						element: <Login />,
					},
					{
						path: 'register',
						element: <Register />,
					},
					{
						path: 'forgot-password',
						element: <ForgotPassword />,
					},
				],
			},
		],
	},
	{
		path: '',
		element: <PlatformGuard />,
		children: [
			{
				path: 'platform',
				element: <Paltform />,
				children: [
					{
						index: true,
						element: <Dashboard />,
					},
					{
						path: 'settings',
						element: <Settings />,
						loader: SettingsLoader,
					},
					{
						element: <RoleGuard roles={['admin']} />,
						children: [
							{
								path: 'users',
								element: <Users />,
							},
							{
								path: 'users/:id',
								element: <User />,
								loader: UserLoader,
							},
							{
								path: 'categories',
								element: <Categories />,
							},
							{
								path: 'avatars',
								element: <Avatars />,
							},
							{
								path: 'announcements',
								element: <Announcements />,
							},
						],
					},
					{
						element: <RoleGuard roles={['instructor', 'admin']} />,
						children: [
							{
								path: 'courses',
								element: <AdminCourses />,
								loader: PlatformCoursesLoader
							},
							{
								path: 'courses/:slug',
								element: <AdminCourse />,
								loader: PlatformCourseLoader
							}
						],
					},
					{
						element: <RoleGuard roles={['student']} />,
						children: [
							{
								path: 'my-courses',
								element: <MyCourses />
							}
						]
					}
				],
			},
		],
	},
	{
		path: 'learn',
		element: <Learn />,
	},
]);

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}

function App() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getAnnouncement());
		dispatch(session())
			.unwrap()
			.then(() => setLoading(false))
			.catch(() => setLoading(false));
	}, []);

	return loading ? (
		<Fallback />
	) : (
		<>
			<Toaster position='bottom-right' reverseOrder={false} />
			<RouterProvider
				router={router}
				fallbackElement={<Fallback />}
			/>
		</>
	);
}

export default App;
