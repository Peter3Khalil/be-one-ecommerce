import { routing } from '@/i18n/routing';
import { formats } from '@/i18n/request';
import { TranslationType } from '@/i18n/translation.type';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: TranslationType;
    Formats: typeof formats;
  }
}
