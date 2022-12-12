/** @format */

import { useLoaderData } from 'react-router-dom';
import { fetchCategories, fetchCourses } from '../../services';
import { Categories, Header, Information, NextCourses } from './components';
import { FeaturedCourses } from './components/FeaturedCourses';

export const loader = async () => {
	const categories = await fetchCategories();
	const courses = await fetchCourses();

	return {
		courses,
		categories,
	};
};

const Home = () => {
	const { courses, categories } = useLoaderData();

	return (
		<main>
			<Header />
			<Information />
			<NextCourses courses={[...courses].filter(courses => courses.status === 'pre-order')} />
			<Categories categories={categories} />
			<FeaturedCourses
				courses={[...courses]
					.filter((course) => course.status === 'published')
					.sort((a, b) => b.likes.length - a.likes.length)
					.slice(0, 8)}
			/>
		</main>
	);
};

export default Home;
