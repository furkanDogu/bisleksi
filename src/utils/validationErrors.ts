import { Schema } from 'yup';

export default {
    INVALID: 'Lütfen geçerli bir ifade giriniz',
    EMAIL: 'Lütfen geçerli bir email giriniz',
    PASSWORD: 'Şifreniz 8 ile 16 karakter arası uzunluta olmalıdır',
    REQUIRED: (field: string) => `Lütfen ${field} alanını doldurunuz`,
    OVERCHARACTER: 'Lütfen geçerli uzunlukta ifadeler giriniz',
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
