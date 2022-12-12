/** @format */

import * as yup from 'yup';

yup.setLocale({
	mixed: { required: 'Campo obrigatório' },
	string: { email: 'Email inválido' },
});

export const registerSschema = yup.object().shape({
	name: yup
		.string()
		.min(2, 'Debe tener al menos 3 caracteres')
		.required(),
	lastName: yup
		.string()
		.min(2, 'Debe tener al menos 3 caracteres')
		.required(),
	email: yup.string().email().required(),
	password: yup
		.string()
		.min(8, 'Debe tener al menos 8 caracteres')
		.required(),
    confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('password'), null],
			'Las contraseñas no coinciden',
		)
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
