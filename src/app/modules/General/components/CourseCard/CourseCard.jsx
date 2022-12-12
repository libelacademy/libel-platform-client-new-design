/** @format */

import { classnames } from '@/app/shared/utils';
import { openVideoModal } from '@/store/general.sclie';
import React from 'react';
import {
	RiFileListLine,
	RiHeart3Line,
	RiLockFill,
	RiPlayCircleLine,
	RiShoppingCart2Line,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Countdown from './Countdown';

const CourseCard = ({ course }) => {
	const { loggedIn, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	return (
		<div className='w-full px-[15px]'>
			<div className='group transition-all duration-300 shadow-item hover:shadow-item-hover p-5 overflow-hidden rounded-lg mb-5 bg-light-background-primary dark:bg-dark-background-secondary hover:transform hover:-translate-y-[10px]'>
				<figure className='relative w-full aspect-square mb-5 overflow-hidden rounded-lg bg-dark-secondary dark:bg-light-secondary'>
					<img
						src={course.image}
						alt={course.title}
						className='w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500'
					/>
					{course.status === 'published' && (
						<span className='absolute z-[1] top-3 right-3 bg-dark-background-primary px-[10px] py-[6px] rounded-lg text-white flex items-center'>
							<RiHeart3Line size={18} className='mr-2' />
							{course.likes}
						</span>
					)}
					<button
						onClick={() => dispatch(openVideoModal(course.trailer))}
						className='absolute top-1/2 rigth-1/2 translate-x-1/2 -translate-y-1/2 py-3 px-7 rounded-full bg-light-background-primary text-button opacity-0 invisible transition-all duration-500  group-hover:visible group-hover:opacity-100 text-dark-background-primary flex items-center  hover:bg-primary hover:text-white'>
						<RiPlayCircleLine size={20} className='mr-2' />
						<span>Ver video</span>
					</button>
					{course.status === 'pre-order' && (
						<Countdown date={course.publishedAt} />
					)}
				</figure>
				<div className='flex items-center justify-between mb-2'>
					<Link to={`/courses/${course.slug}`}>
						<h4 className='text-body font-bold text-light-onSurface dark:text-dark-onSurface duration-300 hover:text-primary hover:dark:text-primary'>
							{course.title}
						</h4>
					</Link>
					{course.private && (
						<RiLockFill
							className='text-light-secondary dark:text-white-2'
							size={20}
						/>
					)}
				</div>
				<div className='w-full flex items-center justify-between mb-4 text-light-secondary dark:text-white-2'>
					<span>{course.category.name}</span>
					<span
						className={classnames(
							'text-sm px-2 py-1 text-white rounded-md capitalize',
							course.level === 'principiante'
								? 'bg-done'
								: course.level === 'intermedio'
								? 'bg-warning'
								: 'bg-critical',
						)}>
						{course.level}
					</span>
				</div>
				<div className='w-full flex items-center justify-between mb-5'>
					<div className='flex items-center '>
						<figure className='bg-[#C4C4C4] h-11 w-11 rounded-lg shadow-avatar overflow-hidden mr-3'>
							<img
								src={course.instructor?.avatar}
								alt={course.instructor?.name}
								className='w-full object-cover'
							/>
						</figure>
						<div className='flex flex-col text-left'>
							<span className='text-light-secondary dark:text-white-2 text-caption-2'>
								Instructor
							</span>
							<span className='text-light-onSurface dark:text-dark-onSurface text-button'>
								{course.instructor?.name}
							</span>
						</div>
					</div>
					<div className='flex flex-col items-end'>
						<span className='text-light-secondary dark:text-white-2 text-caption-2 text-right'>
							Inversión
						</span>
						<span className='text-light-onSurface dark:text-dark-onSurface text-button'>
							{course.price} USD
						</span>
					</div>
				</div>
				<div className='w-full flex flex-row-reverse items-center justify-between gap-4'>
					{/* {cartItems.find((i) => i._id === course._id) ? (
						<Link
							to={`/${PublicRoutes.CART}`}
							className={classnames(
								'flex items-center text-button font-bold text-white bg-primary border-2 border-primary rounded-full px-3 py-1 duration-200',
							)}>
							<RiShoppingCart2Line size={18} className='mr-2' />
							<span>Ir al carro</span>
						</Link>
					) : (
						<button
							onClick={() =>
								dispatch(cartActions.addItemToCart(course))
							}
							className={classnames(
								'group flex items-center text-button font-bold text-primary dark:text-white bg-transparent border-2 border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all duration-300 ',
							)}>
							<RiShoppingCart2Line size={18} className='mr-2' />
							<span>Añadir al carro</span>
						</button>
					)} */}

					<a
						href='/'
						className='flex items-center text-left text-light-secondary dark:text-white-2 duration-300 hover:text-primary hover:dark:text-primary '>
						<RiFileListLine size={16} className='mr-2' />
						<span className='text-caption font-bold'>
							Ver Temario
						</span>
					</a>
					{loggedIn &&
						user?.role === 'student' &&
						(course.private ? (
							<button
								className={classnames(
									'group flex items-center text-button font-bold text-primary dark:text-white bg-transparent border-2 border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all duration-300 ',
								)}>
								<span>Más información</span>
							</button>
						) : (
							<button
								// onClick={() =>
								// 	dispatch(cartActions.addItemToCart(course))
								// }
								className={classnames(
									'group flex items-center text-button font-bold text-primary dark:text-white bg-transparent border-2 border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all duration-300 ',
								)}>
								<RiShoppingCart2Line size={18} className='mr-2' />
								<span>Añadir al carro</span>
							</button>
						))}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
