/** @format */

import { classnames } from '@/app/shared/utils';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import {
	RiCheckLine,
	RiCodeSLine,
	RiErrorWarningFill,
} from 'react-icons/ri';

const SelectRole = ({ name, register, setValue, errors }) => {
	const [roles] = useState([
		{
			name: 'Administrador',
			value: 'admin',
		},
		{
			name: 'Instructor',
			value: 'instructor',
		},
		{
			name: 'Estudiante',
			value: 'student',
		}
	]);

	const [selected, setSelected] = useState({
		name: 'Rol',
		value: '',
	});

	const handleRole = (role) => {
		setSelected(role);
		setValue(name, role.value);
	};

	return (
		<div className='relative w-full mb-2 pb-6'>
			{errors[name] && (
				<span className='absolute right-12 top-6 -translate-y-1/2 text-critical'>
					<RiErrorWarningFill size={20} />
				</span>
			)}
			<input
				type='text'
				name={name}
				className='hidden'
				value={selected.value}
				placeholder='Rol'
				{...register(name)}
			/>
			<Listbox value={selected} onChange={handleRole}>
				<div className='relative'>
					<Listbox.Button
						className={classnames(
							'w-full flex items-center justify-between bg-transparent border px-5 py-3 text-caption rounded-lg focus:outline-none text-white-2',
							errors[name]
								? 'border-critical text-critical'
								: ' border-dark-secondary',
						)}>
						<span>{selected.name}</span>
						<RiCodeSLine size={16} className='rotate-90' />
					</Listbox.Button>
					<Listbox.Options className='absolute -top-2 border border-dark-secondary  -translate-y-full font-light py-1 mb-1 w-full max-h-60  overflow-auto rounded-md bg-light-background-secondary  text-sm shadow-lg focus:outline-none'>
						{roles.map((role) => (
							<Listbox.Option
								key={role.value}
								value={role}
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
												selected ? 'font-semibold' : 'font-normal',
												'block truncate',
											)}>
											{role.name}
										</span>
										{selected ? (
											<span
												className={classnames(
													active ? 'text-white-2' : 'text-white-2',
													'absolute inset-y-0 left-0 flex items-center pl-3',
												)}>
												<RiCheckLine
													size={20}
													className='text-primary'
												/>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</div>
			</Listbox>
			<p className='absolute right-0 pt-1 text-caption-2 text-critical text-right'>
				{errors[name] && errors[name].message}
			</p>
		</div>
	);
};

export default SelectRole;
