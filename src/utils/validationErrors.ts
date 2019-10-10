import { Schema } from 'yup';

export default {
    INVALID: 'Lütfen geçerli bir ifade giriniz',
    EMAIL: 'Lütfen geçerli bir email giriniz',
    REQUIRED: (field: string) => `Lütfen ${field} alanını doldurunuz`,
};

export const errorPrinter = async (schema: Schema<any>, values: any) => {
    let err = null;
    try {
        await schema.validate(values);
    } catch (e) {
        err = e.errors.pop();
    }
    return err;
};
