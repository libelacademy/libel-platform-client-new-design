/** @format */

import React from 'react';
import { useEffect } from 'react';
import {
	RiFileListLine,
	RiHeart3Line,
	RiShoppingCart2Line,
	RiUser3Line,
} from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Header } from '../../components';
import { fetchCourse } from '../../services';
import Countdown from './Countdown';

const Course = () => {
	const course = useLoaderData();
	const { user, profile, loggedIn } = useSelector(
		(state) => state.auth,
	);

	console.log(course.hidden);

	useEffect(() => {
		if (course.hidden && !loggedIn) {
			window.location.href = '/courses';
		}
	}, [loggedIn, user, profile, course]);

	return (
		<main>
			<Header title={course.title} />
			<section className='pt-20 px-[15px] bg-light-background-primary dark:bg-dark-background-primary'>
				<div className='container flex flex-col lg:flex-row'>
					<div className='w-full lg:w-6/12 pb-10 lg:pb-0'>
						<figure className='w-full aspect-video rounded-lg overflow-hidden bg-black'>
							<ReactPlayer
								url={course.trailer}
								width='100%'
								height='100%'
								playing={false}
								controls
							/>
						</figure>
					</div>
					<div className='w-full lg:w-6/12 lg:pl-10'>
						{/* <h4 className='text-heading-5 md:text-heading-4 text-left text-light-onSurface dark:text-dark-onSurface mb-4'>
							{course.title}
						</h4> */}
						<div className='w-full flex flex-col md:flex-row items-center justify-between mb-4 gap-4'>
							<div className='w-full lg:w-1/2  flex itmes-start justify-start gap-4'>
								<span className='bg-dark-secondary dark:bg-dark-background-footer text-caption rounded-full font-bold h-9 px-4 text-light-onSurface dark:text-dark-onSurface flex items-center justify-center'>
									<RiUser3Line size={16} className='mr-2' />
									{course?.students}
								</span>
								<span className='bg-dark-secondary dark:bg-dark-background-footer text-caption rounded-full font-bold h-9 px-4 text-light-onSurface dark:text-dark-onSurface flex items-center justify-center'>
									<RiHeart3Line size={16} className='mr-2' />
									{course?.likes}
								</span>
							</div>

							<div className='w-full lg:w-1/2 flex flex-col md:flex-row items-center justify-end gap-4 lg:gap-2'>
								{/* <span className='bg-dark-secondary dark:bg-dark-background-secondary rounded-full h-9 w-9 text-light-onSurface dark:text-dark-onSurface flex items-center justify-center'>
										<RiSendPlaneLine size={16} />
									</span> */}
								<a
									href='/'
									className='bg-dark-secondary dark:bg-dark-background-secondary rounded-full h-9 px-4 text-light-onSurface dark:text-dark-onSurface hover:bg-primary hover:text-white flex items-center justify-center'>
									<RiFileListLine size={16} className='mr-2' />
									<span className='text-caption font-bold'>
										Ver Temario
									</span>
								</a>
								{/* {cartItems.find((i) => i._id === course._id) ? (
									<Link
										to={`/${PublicRoutes.CART}`}
										className={classnames(
											'flex items-center justify-center text-button font-bold text-white bg-primary border-2 border-primary rounded-full  h-9 px-4 duration-200',
										)}>
										<RiShoppingCart2Line size={16} className='mr-2' />
										<span>Ir al carro</span>
									</Link>
								) : (
									<button
										onClick={() =>
											dispatch(cartActions.addItemToCart(course))
										}
										className={classnames(
											'flex items-center justify-center text-button font-bold text-primary dark:text-white bg-transparent border-2 border-primary dark:border-white hover:dark:border-primary rounded-full  h-9 px-4 duration-300 hover:text-white hover:bg-primary',
										)}>
										<RiShoppingCart2Line size={16} className='mr-2' />
										<span>Añadir al carro</span>
									</button>
								)} */}
							</div>
						</div>
						<div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-4'>
							<div className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg p-3 flex items-center'>
								<figure className='bg-light-background-secondary dark:bg-light-secondary h-12 w-12 rounded-lg overflow-hidden mr-3'>
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
									<span className='text-light-onSurface dark:text-dark-onSurface text-heading-6 font-bold'>
										{course.instructor?.name}
									</span>
								</div>
							</div>
							<div className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg p-3 flex items-center'>
								<figure className='bg-light-background-secondary dark:bg-light-secondary h-12 w-12 rounded-lg overflow-hidden mr-3'>
									<img
										src={course.category?.image}
										alt={course.category?.name}
										className='h-full object-cover'
									/>
								</figure>
								<div className='flex flex-col text-left w-'>
									<span className='text-light-secondary dark:text-white-2 text-caption-2'>
										Categoría
									</span>
									<span className='text-light-onSurface dark:text-dark-onSurface text-heading-6 font-bold'>
										{course.category?.name}
									</span>
								</div>
							</div>
						</div>
						<div className='w-full flex flex-col md:flex-row items-center justify-between mb-4 gap-4'>
							<div className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg p-3 flex items-center'>
								<div className='w-full flex items-center justify-between text-left'>
									<span className='text-light-secondary dark:text-white-2 text-caption'>
										Certificado:
									</span>
									<span className='text-light-onSurface dark:text-dark-onSurface text-heading-6'>
										{course?.withCertificate ? 'Si' : 'No'}
									</span>
								</div>
							</div>
							<div className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg p-3 flex items-center'>
								<div className='w-full flex items-center justify-between text-left'>
									<span className='text-light-secondary dark:text-white-2 text-caption'>
										Feedback:
									</span>
									<span className='text-light-onSurface dark:text-dark-onSurface text-heading-6'>
										{course?.withFeedback ? 'Si' : 'No'}
									</span>
								</div>
							</div>
							<div className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg p-3 flex items-center'>
								<div className='w-full flex items-center justify-between text-left'>
									<span className='text-light-secondary dark:text-white-2 text-caption'>
										Acceso:
									</span>
									<span className='text-light-onSurface dark:text-dark-onSurface text-heading-6'>
										{course?.timeToAccess}{' '}
										{course?.timeToAccess > 1 ? 'Meses' : 'Mes'}
									</span>
								</div>
							</div>
						</div>
						<p className='text-light-secondary dark:text-dark-onSurface text-caption mb-4'>
							{course?.description}
						</p>
						<div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-4'>
							<div className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg p-3 flex items-center'>
								<div className='w-full flex items-center justify-between text-left'>
									<span className='text-light-secondary dark:text-white-2 text-caption'>
										Inversión:
									</span>
									<span className='text-light-onSurface dark:text-dark-onSurface text-heading-6'>
										{course?.price} USD
									</span>
								</div>
							</div>
							<div className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg p-3 flex items-center'>
								<div className='w-full flex items-center justify-between text-left'>
									<span className='text-light-secondary dark:text-white-2 text-caption'>
										Inicia en:
									</span>
									{course.status === 'published' && (
										<span className='text-light-onSurface dark:text-dark-onSurface text-heading-6'>
											{course.isOnline ? 'Ya comenzó' : 'A tu ritmo'}
										</span>
									)}
									{course.status === 'pre-order' && (
										<Countdown date={course.publishedAt} />
									)}
								</div>
							</div>
						</div>
						{course.private ? (
							<button className='w-full flex items-center justify-center text-button border-2 border-transparent text-primary bg-primary/10 dark:border-dark-onSurface dark:bg-transparent dark:text-dark-onSurface rounded-full p-3 duration-200 hover:text-white hover:bg-primary hover:dark:text-primary hover:dark:bg-dark-onSurface'>
								<span>Solicitar Información</span>
							</button>
						) : (
							<button className='w-full flex items-center justify-center text-button border-2 border-transparent text-primary bg-primary/10 dark:border-dark-onSurface dark:bg-transparent dark:text-dark-onSurface rounded-full p-3 duration-200 hover:text-white hover:bg-primary hover:dark:text-primary hover:dark:bg-dark-onSurface'>
								<span>Comprar Ahora</span>
							</button>
						)}
					</div>
				</div>
			</section>
			{/* <section className='py-10 px-[15px]  bg-light-background-primary dark:bg-dark-background-primary'>
				<div className='container w-full flex flex-col md:flex-row items-center justify-between mb-4 gap-4'>
					<button className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg py-3 px-4 flex items-center hover:bg-white-2/60'>
						<div className='w-full flex items-center justify-center text-center'>
							<span className='text-light-onSurface dark:text-dark-onSurface text-heading-5'>
								Acceso a Dsicord
							</span>
						</div>
					</button>
					<button className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg py-3 px-4 flex items-center hover:bg-white-2/60'>
						<div className='w-full flex items-center justify-between text-left'>
							<span className='text-light-onSurface dark:text-dark-onSurface text-heading-5'>
								Materiales
							</span>
							<span className='text-light-secondary dark:text-white-2 text-body-2'>
								{course.materials?.length || 0}
							</span>
						</div>
					</button>
					<button className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg py-3 px-4 flex items-center hover:bg-white-2/60'>
						<div className='w-full flex items-center justify-between text-left'>
							<span className='text-light-onSurface dark:text-dark-onSurface text-heading-5'>
								Lecciones
							</span>
							<span className='text-light-secondary dark:text-white-2 text-body-2'>
								{course.lessons?.length || 0}
							</span>
						</div>
					</button>
					<button className='flex-1 w-full bg-dark-secondary dark:bg-dark-background-secondary rounded-lg py-3 px-4 flex items-center hover:bg-white-2/60'>
						<div className='w-full flex items-center justify-between text-left'>
							<span className='text-light-onSurface dark:text-dark-onSurface text-heading-5'>
								Feedbacks
							</span>
							<span className='text-light-secondary dark:text-white-2 text-body-2'>
								{course.feedbacks?.length || 0}
							</span>
						</div>
					</button>
				</div>
			</section> */}
		</main>
	);
};

export const loader = async ({ params }) => {
	const slug = params.slug;
	const course = await fetchCourse(slug);
	return course;
};

export default Course;
