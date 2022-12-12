/** @format */

import * as yup from 'yup';

yup.setLocale({
	mixed: { required: 'Campo obrigatório' },
	string: { email: 'Email inválido' },
});

export const changePasswordSchema = yup.object().shape({
	oldPassword: yup
		.string()
		.min(8, 'Debe tener al menos 8 caracteres')
		.required(),
	newPassword: yup
		.string()
		.min(8, 'Debe tener al menos 8 caracteres')
		.required(),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('newPassword'), null],
			'Las contraseñas no coinciden',
		)
		.required(),
});
