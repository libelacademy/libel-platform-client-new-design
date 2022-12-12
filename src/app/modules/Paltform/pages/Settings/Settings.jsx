/** @format */

import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Header } from '../../components/Header';
import { fetchAvatars } from '../../services';
import {
	ChangePassword,
	DeleteAccount,
	EditProfile,
} from './components';

export const loader = async () => {
	const avatars = await fetchAvatars();
	return { avatars };
};

const Settings = () => {
	const { avatars } = useLoaderData();
	const { user } = useSelector((state) => state.auth);

	return (
		<div className='w-full  pb-7'>
			<Header title={'configuración'} />
			<div className='w-full flex flex-col gap-6'>
				<EditProfile avatars={avatars} />
				{user?.provider === 'local' && <ChangePassword />}
				<DeleteAccount />
			</div>
		</div>
	);
};

export default Settings;
