/** @format */

import * as yup from 'yup';

yup.setLocale({
	mixed: { required: 'Campo obrigatório' },
	string: { email: 'Email inválido' },
});

export const addUserSchema = yup.object().shape({
	name: yup
		.string()
		.min(2, 'Debe tener al menos 3 caracteres')
		.required(),
	lastName: yup
		.string()
		.min(2, 'Debe tener al menos 3 caracteres')
		.required(),
	role: yup
		.string()
		.oneOf(['admin', 'instructor', 'student'])
		.required(),
	email: yup.string().email().required(),
	password: yup
		.string()
		.min(8, 'Debe tener al menos 8 caracteres')
		.required(),
	country: yup
		.string()
		.oneOf([
			'MX',
			'CO',
			'ES',
			'AR',
			'VE',
			'PE',
			'CL',
			'GT',
			'EC',
			'CU',
			'BO',
			'DO',
			'HN',
			'SV',
			'NI',
			'CR',
			'PA',
			'PY',
			'UY',
			'GQ',
		])
		.required(),
	phone: yup
		.string()
		.min(10, 'Número de telefone inválido')
		.matches(/^[0-9]+$/, 'Número de telefone inválido')
		.required(),
});
