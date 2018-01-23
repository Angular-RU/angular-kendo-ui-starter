import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { CountriesService } from '@app/core';

@Component({
  selector: 'app-countries-table',
  template: `
    <app-reference-table title="{{'Menu.Countries' | translate }}" [service]="countriesService"></app-reference-table>`
})
export class CountiesTableComponent {
  public pageSize = 10;

  constructor(public countriesService: CountriesService) {}
}
