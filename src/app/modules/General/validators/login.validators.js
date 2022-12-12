
import * as yup from 'yup';

yup.setLocale({
	mixed: { required: 'Campo requerido' },
	string: { email: 'Email inválido' },
});


export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

