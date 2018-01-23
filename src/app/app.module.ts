import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import localRu from '@angular/common/locales/ru';
import localRuExtra from '@angular/common/locales/extra/ru';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MenuModule } from './features/menu/menu.module';
import { LoginModule } from './features/login/login.module';
import { TranslateService } from '@ngx-translate/core';

registerLocaleData(localRu, 'ru', localRuExtra);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MenuModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  readonly defaultLocalId = 'en';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.defaultLocalId);
    const localeId = localStorage.getItem('localeId');
    if (localeId) {
      translate.use(localeId);
    }
  }
}
