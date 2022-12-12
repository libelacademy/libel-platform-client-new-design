/** @format */

import React from 'react';

const Footer = () => {
	return (
		<footer className='sticky z-10 w-full bottom-0 left-0 shadow bg-white'>
			<div className='container px-[15px] py-4 flex flex-col md:flex-row items-center justify-between'>
				<p className='text-light-secondary text-caption-2'>
					&copy; 2022 Libel Academy. Todos los derechos reservados.
				</p>
				<div className='flex items-center space-x-4'>
					<span className='text-light-secondary text-caption-2 cursor-pointer duration-300 hover:text-primary'>
						Términos y Condiciones
					</span>
					<span className='text-light-secondary text-caption-2 cursor-pointer duration-300 hover:text-primary'>
						Política de Privacidad
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
