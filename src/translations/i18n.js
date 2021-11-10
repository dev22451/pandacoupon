import I18n from 'react-native-i18n';
import en from './languages/english.json';

I18n.fallbacks = true;

I18n.translations = {
  en: en,
};

export default I18n;
