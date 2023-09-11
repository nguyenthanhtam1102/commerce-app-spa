import { I18n } from 'i18n-js';
import vi from './vi.json';
import en from './en.json';
import { LANGUAGE_ENGLISH, LANGUAGE_VIETNAMESE } from '../Constants/constants';

const i18n = new I18n();

i18n.translations = {
    [LANGUAGE_ENGLISH] : en,
    [LANGUAGE_VIETNAMESE] : vi,
}

i18n.defaultLocale = LANGUAGE_ENGLISH
i18n.locale = LANGUAGE_ENGLISH

export default i18n;
