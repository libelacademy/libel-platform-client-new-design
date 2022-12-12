/** @format */

import { classnames, countries } from '@/app/shared/utils';
import { Listbox } from '@headlessui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RiCheckLine, RiCodeSLine } from 'react-icons/ri';

const SelectCountry = ({ name, register, setValue, value }) => {
	const [selectedCountry, setSelectedCountry] = useState(
		countries.find((c) => c.code === 'CO'),
	);

	const handleCountry = (country) => {
		setSelectedCountry(country);
		setValue(name, country.code);
	};

	useEffect(() => {
		if (value) {
			const country = countries.find((c) => c.code === value);
			setSelectedCountry(country);
			setValue(name, country.code);
		}
	}, [value]);

	return (
		<div className='relative w-full mb-2 pb-6'>
			<input
				type='text'
				name={name}
				className='hidden'
				value={selectedCountry.code}
				placeholder='País'
				{...register(name)}
			/>
			<Listbox value={selectedCountry} onChange={handleCountry}>
				<div className='relative'>
					<Listbox.Button className='w-full flex items-center justify-between bg-transparent border px-5 py-3 text-caption rounded-lg focus:outline-none border-dark-secondary dark:border-dark-background-secondary text-white-2'>
						<span className='flex items-center'>
							<img
								src={selectedCountry?.flag}
								alt=''
								className='w-6 mr-2'
							/>
							<span>
								{selectedCountry.name} ({selectedCountry.dial_code})
							</span>
						</span>
						<RiCodeSLine size={16} className='rotate-90' />
					</Listbox.Button>
					<Listbox.Options className='absolute -top-2 border border-dark-secondary dark:border-dark-background-secondary -translate-y-full font-light py-1 mb-1 w-full max-h-60  overflow-auto rounded-md bg-light-background-secondary dark:bg-dark-background-secondary text-sm shadow-lg focus:outline-none'>
						{countries.map((country) => (
							<Listbox.Option
								key={country.code}
								value={country}
								className={({ active }) =>
									classnames(
										'cursor-pointer select-none relative py-2 pl-10 pr-4',
										active
											? 'bg-primary/20 text-primary dark:text-white'
											: 'text-white-2',
									)
								}>
								{({ selected, active }) => (
									<>
										<span
											className={classnames(
												'flex items-center',
												selected ? 'font-semibold text-primary' : 'font-normal',
											)}>
											<img
												src={country.flag}
												alt=''
												className='w-6 mr-2'
											/>
											<span>
												{country.name} ({country.dial_code})
											</span>	
										</span>
										{selected ? (
											<span
												className={classnames(
													active ? 'text-white-2' : 'text-white-2',
													'absolute inset-y-0 left-0 flex items-center pl-3'
												)}
											>
												<RiCheckLine size={20} className='text-primary'  />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</div>
			</Listbox>
		</div>
	);
};

export default SelectCountry;
