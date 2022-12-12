/** @format */

import { closeVideoModal } from '@/store/general.sclie';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

const VideoModal = () => {
	const {videoModal} = useSelector((state) => state.general);
	const dispatch = useDispatch();

	return (
		<Transition appear show={videoModal.show} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-30'
				onClose={() => dispatch(closeVideoModal())}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black bg-opacity-70' />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='relative w-full max-w-5xl aspect-video transform text-left align-middle shadow-xl transition-all'>
								<button
									onClick={() => dispatch(closeVideoModal())}
									className='absolute w-14 h-14 rounded-full bg-primary/50 left-1/2 -translate-x-1/2 -bottom-6 translate-y-full flex items-center justify-center hover:bg-primary'>
									<RiCloseFill size={32} className='text-white' />
								</button>
								<div className='w-full h-full rounded-lg bg-[#000000] overflow-hidden'>
									<ReactPlayer
										url={videoModal.url}
										width='100%'
										height='100%'
										controls
										playing
									/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default VideoModal;
