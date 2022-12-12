/** @format */

import {
	RiDiscordFill,
	RiFacebookCircleFill,
	RiInstagramFill,
	RiLinkedinFill,
	RiTwitterFill,
	RiYoutubeFill,
} from 'react-icons/ri';

const information = {
	name: 'Libel Academy',
	description:
		'Libel Academy - Aprende 3D desde cero online en vivo. Desde cualquier dispositivo. Desde cualquier lugar.',
	social: [
		{
			name: 'facebook',
			url: 'https://www.facebook.com/',
			Icon: RiFacebookCircleFill,
		},
		{
			name: 'twitter',
			url: 'https://www.twitter.com/',
			Icon: RiTwitterFill,
		},
		{
			name: 'instagram',
			url: 'https://www.instagram.com/',
			Icon: RiInstagramFill,
		},
		{
			name: 'discord',
			url: 'https://www.discord.com/',
			Icon: RiDiscordFill,
		},
		{
			name: 'youtube',
			url: 'https://www.youtube.com/',
			Icon: RiYoutubeFill,
		},
		{
			name: 'linkedin',
			url: 'https://www.linkedin.com/',
			Icon: RiLinkedinFill,
		},
	],
};

export default information;
