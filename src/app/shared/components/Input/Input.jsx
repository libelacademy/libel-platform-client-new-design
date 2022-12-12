/** @format */

import { classnames } from '@/app/shared/utils';
import React, { useState } from 'react';
import {
	RiErrorWarningFill,
	RiEyeFill,
	RiEyeOffFill,
} from 'react-icons/ri';

const Input = ({
	name,
	type,
	register,
	errors,
	placeholder,
	value,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='relative w-full mb-2 pb-6'>
			{errors[name] && (
				<span className='absolute right-2 top-6 -translate-y-1/2 text-critical'>
					<RiErrorWarningFill size={20} />
				</span>
			)}
			<div className='relative'>
				<input
					className={classnames(
						'w-full bg-transparent border px-5 py-3 text-caption rounded-lg focus:outline-none',
						errors[name]
							? 'border-critical text-critical'
							: 'border-dark-secondary dark:border-dark-background-secondary text-white-2 bg-white dark:bg-transparent',
					)}
					type={
						type === 'password'
							? showPassword
								? 'text'
								: 'password'
							: type
					}
					placeholder={placeholder}
					{...register(name)}
					defaultValue={value ? value : null}
				/>
				{type === 'password' && (
					<span
						className={classnames(
							'absolute right-4 top-6 -translate-y-1/2 cursor-pointer',
							errors[name] ? 'right-8' : 'right-4',
						)}
						onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? (
							<RiEyeOffFill size={20} className='text-white-2' />
						) : (
							<RiEyeFill size={20} className='text-white-2' />
						)}
					</span>
				)}
			</div>
			<p className='absolute right-0 pt-1 text-caption-2 text-critical text-right'>
				{errors[name] && errors[name].message}
			</p>
		</div>
	);
};

export default Input;
