/** @format */

import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 1024 * 1024 * 5;

export const addCategorySchema = yup.object().shape({
	name: yup
		.string()
		.min(2, 'Debe tener al menos 3 caracteres')
		.required('Campo obrigatório'),
	image: yup.
    mixed()
    .required("Campo obrigatório")
    .test(
      "fileSize",
      "O arquivo é muito grande",
      value => value && value[0].size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Formato de arquivo não suportado",
      value => value && SUPPORTED_FORMATS.includes(value[0].type)
    )
});
