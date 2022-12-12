/** @format */

const BoxIcon = ({ Icon, background, title, description }) => {
	return (
		<div className='w-full md:1/2 lg:w-1/3 xl:w-1/4  md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] xl:flex-[0_0_25%] px-[15px] text-center'>
			<figure
				className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 ${background} mx-auto transform group-hover:scale-105`}>
				<Icon size={28} className='' />
			</figure>
			<h5 className='transition duration-300 text-heading-5 text-light-onSurface dark:text-dark-onSurface mb-[14px]'>
				{title}
			</h5>
			<p className='transition duration-300 text-caption text-light-secondary dark:text-dark-onSurface'>
				{description}
			</p>
		</div>
	);
};

export default BoxIcon;
