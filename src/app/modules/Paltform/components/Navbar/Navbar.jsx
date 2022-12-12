/** @format */

import { CartMenu, UserMenu } from '@/app/shared/components';
import { useSelector } from 'react-redux';

import logoLibel from '@/assets/images/libel-logo-dark.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<nav className='sticky z-10 w-full top-0 left-0 shadow bg-white'>
			<div className='container px-[15px] 2xl:px-0 py-4 flex justify-between'>
				<div className='flex'>
					<div className='2xl:hidden relative z-10 flex items-center'>
						<Link to='/' className='inline-block h-8 md:h-10'>
							<img
								src={logoLibel}
								alt='Libel'
								className='h-full object-cover'
							/>
						</Link>
					</div>
				</div>
				<div className='flex items-center space-x-4'>
					<CartMenu platform size={24} />
					<UserMenu platform />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
