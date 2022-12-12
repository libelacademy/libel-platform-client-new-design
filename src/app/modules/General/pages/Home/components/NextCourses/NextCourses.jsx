/** @format */

import { CourseCard } from '@/app/modules/General/components/CourseCard';
import { Title } from '@/app/modules/General/components/Title';
import React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';

const NextCourses = ({ courses }) => {
	const settings = {
		arrows: false,
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 6000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const ref = useRef()
	console.log(ref)

	return (
		<section className='section px-[-15px] bg-light-background-primary dark:bg-dark-background-primary'>
			<div className='container'>
				<Title title='Próximos Cursos' />
				<Slider ref={ref} {...settings}>
					{courses.map((course) => (
						<CourseCard key={course._id} course={course} />
					))}
				</Slider>
			</div>
		</section>
	);
};

export default NextCourses;
