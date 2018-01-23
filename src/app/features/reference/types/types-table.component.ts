import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { TypesService } from '../../../core/references/types.service';
import { SimpleModel } from '../../../core/index';
@Component({
  selector: 'app-types-table',
  template: `
    <app-reference-table title="{{'Menu.Types' | translate }}" [service]="typesService"></app-reference-table>`
})
export class TypesTableComponent {
  public pageSize = 10;

  constructor(public typesService: TypesService) {}
}
