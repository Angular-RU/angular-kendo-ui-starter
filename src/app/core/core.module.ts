import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  AuthService,
  TempStateService,
  OrdersService,
  CountriesService,
  AuthGuard
} from './index';
import { TypesService } from './references/types.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthService,
    AuthGuard,
    TempStateService,
    OrdersService,
    TypesService,
    CountriesService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
