import {
  enableProdMode,
  TRANSLATIONS,
  TRANSLATIONS_FORMAT,
  MissingTranslationStrategy,
  LOCALE_ID
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
const defaultLocalId = 'en';
let localeId = localStorage.getItem('localeId');
localeId = localeId ? localeId : defaultLocalId;

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [{ provide: LOCALE_ID, useValue: localeId }]
  })
  .catch(err => console.log(err));
