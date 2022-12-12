/** @format */

// import { Loading } from '@/app/shared/components';

import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

const Paltform = () => {
	return (
		<main className='relative w-full min-h-screen flex'>
			<Sidebar />
			<div className='relative flex-1 flex flex-col bg-light-background-secondary'>
				<Navbar />
				<div className='flex-grow overflow-y-auto p-[15px]'>
					<div className='container flex h-full'>
						<Outlet />
					</div>
				</div>
				<Footer />
			</div>
		</main>
	);
};

export default Paltform;
