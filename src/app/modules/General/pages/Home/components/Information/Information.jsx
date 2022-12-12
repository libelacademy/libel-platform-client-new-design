/** @format */

import { useState } from 'react';
import {
	RiBookmark2Fill,
	RiImage2Fill,
	RiLayoutGridFill,
	RiWallet2Fill
} from 'react-icons/ri';
import { BoxIcon } from './components';

const Information = () => {
	const [steps] = useState([
		{
			step: 1,
			background: 'bg-primary',
			Icon: RiWallet2Fill,
			title: 'Set up your wallet',
			information:
				'Once you’ve set up your wallet of choice, connect it to OpenSeaby clicking the NFT Marketplacein the top right corner.',
		},
		{
			step: 2,
			background: 'bg-done',
			Icon: RiLayoutGridFill,
			title: 'Create your collection',
			information:
				'Click Create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.',
		},
		{
			step: 3,
			background: 'bg-[#9835FB]',
			Icon: RiImage2Fill,
			title: 'Add your NFTs',
			information:
				'Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats',
		},
		{
			step: 4,
			background: 'bg-critical',
			Icon: RiBookmark2Fill,
			title: 'List them for sale',
			information:
				'Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs!',
		},
	]);

	return (
		<section className='section transition-all duration-300 bg-light-background-secondary dark:bg-dark-background-footer'>
			<div className='container'>
				<div className='flex flex-wrap'>
					{steps.map(
						({ step, Icon, title, information, background }) => (
							<BoxIcon
								key={step}
								Icon={Icon}
								title={title}
								description={information}
								background={background}
							/>
						),
					)}
				</div>
			</div>
		</section>
	);
};

export default Information;
