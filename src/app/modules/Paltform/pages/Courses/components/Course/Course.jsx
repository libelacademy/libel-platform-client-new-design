/** @format */

import { classnames } from '@/app/shared/utils';
import React from 'react';
import {
	RiEyeLine,
	RiEyeOffLine,
	RiLockLine,
	RiLockUnlockLine,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Course = ({ course, deleteCourse }) => {
	const { role } = useSelector((state) => state.auth.user);

	return (
		<div className='w-full md:1/2 lg:w-1/3 xl:w-1/4  md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] xl:flex-[0_0_25%] px-[15px]'>
			<div className='group transition-all duration-300 shadow-item hover:shadow-item-hover  overflow-hidden rounded-lg mb-5 bg-light-background-primary hover:transform hover:-translate-y-[10px]'>
				<figure className='relative w-full aspect-square overflow-hidden rounded-lg bg-dark-secondary'>
					{course.image && (
						<img
							src={course.image}
							alt={course.title}
							className='w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500'
						/>
					)}
					<div className='absolute z-[1] top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent' />
					<div className='absolute z-[2] flex flex-col items-start justify-start gap-2 top-2 left-2'>
						<span className='inline-block px-2 py-1 text-sm font-semibold bg-white text-black bg-dark-primary rounded-lg'>
							{course.category?.name || 'Sin categoria'}
						</span>
						<span className='p-2 rounded-lg bg-white text-black'>
							{course.private ? (
								<RiLockLine size={18} />
							) : (
								<RiLockUnlockLine size={18} />
							)}
						</span>
						<span className='p-2 rounded-lg bg-white text-black'>
							{course.hidden ? (
								<RiEyeOffLine size={18} />
							) : (
								<RiEyeLine size={18} />
							)}
						</span>
					</div>
					<div className='absolute z-[2] flex flex-col items-end justify-start gap-2 top-2 right-2'>
						<Link
							to={`/courses/${course.slug}`}
							className='w-[80px] text-center inline-block px-2 py-1 text-sm font-semibold bg-white text-primary hover:bg-primary/50 hover:text-white  rounded-lg lg:translate-x-full lg:opacity-0 lg:invisible group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible transition-all ease-out duration-300'
						>
							Ver
						</Link>
						<Link
							to={`/platform/courses/${course._id}`}
							className='w-[80px] text-center  inline-block px-2 py-1 text-sm font-semibold bg-white text-warning hover:bg-warning/50 hover:text-white rounded-lg translate-x-full opacity-0 invisible group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible transition-all delay-75 ease-out duration-300'
						>
							Editar
						</Link>
						<button
							onClick={() => deleteCourse(course)}
							className='w-[80px] text-center  inline-block px-2 py-1 text-sm font-semibold bg-white text-critical hover:bg-critical/50 hover:text-white rounded-lg translate-x-full opacity-0 invisible group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible transition-all delay-150 ease-out duration-300'
						>
							Eliminar
						</button>
					</div>
					<div className=' w-full absolute bottom-0 left-0 z-[2] p-4'>
						<h4 className='text-heading-5 font-bold text-white'>
							{course.title}
						</h4>
						{role === 'admin' && (
							<>
								<div className='w-full h-px bg-white/50 mt-1 mb-2' />
								<div className='w-full flex items-center justify-between'>
									<div className='flex items-center '>
										<figure className='bg-[#C4C4C4] h-6 w-6 rounded-full shadow-avatar overflow-hidden mr-2'>
											{course.instructor && (
												<img
													src={course.instructor?.avatar}
													alt={course.instructor?.name}
													className='w-full object-cover'
												/>
											)}
										</figure>
										<div className='flex flex-col text-left'>
											<span className='text-white font-bold text-caption'>
												{course.instructor?.name || 'Sin instructor'}
											</span>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</figure>
			</div>
		</div>
	);
};

export default Course;
