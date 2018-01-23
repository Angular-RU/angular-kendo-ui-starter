import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  PageChangeEvent,
  GridDataResult,
  GridComponent
} from '@progress/kendo-angular-grid';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {
  IdNameModel,
  OrderViewModel,
  OrdersService,
  CountriesService
} from '../../../core/index';
import { TypesService } from '../../../core/references/types.service';
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html'
})
export class OrdersTableComponent implements OnInit {
  public types: IdNameModel[] = [];
  public countries: IdNameModel[] = [];

  public items$: Observable<OrderViewModel[]>;
  private data: Object[];

  constructor(
    private orderService: OrdersService,
    private countriesService: CountriesService,
    private typesService: TypesService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.items$ = Observable.combineLatest(
      this.countriesService.getAllTranslated(),
      this.typesService.getAllTranslated(),
      this.orderService.getOrders()
    ).switchMap(x => {
      this.countries = x[0];
      this.types = x[1];

      return this.orderService
        .getOrders()
        .map(y =>
          y.map(
            z =>
              new OrderViewModel(
                z.id,
                z.country,
                z.createdDate,
                z.type,
                this.types.find(z1 => z1.id === z.type).name,
                this.countries.find(z1 => z1.id === z.country).name,
                z.name,
                z.count
              )
          )
        );
    });
  }
}
