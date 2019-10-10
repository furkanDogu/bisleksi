import { object, string } from 'yup';

import ERRORS from '@utils/validationErrors';

export default object({
    email: string()
        .typeError(ERRORS.INVALID)
        .email(ERRORS.EMAIL)
        .required(ERRORS.REQUIRED('e-posta')),
    password: string()
        .typeError(ERRORS.INVALID)
        .required(ERRORS.REQUIRED('şifre')),
});
