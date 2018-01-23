import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
// to avoid error 'TypeError: Observable_1.Observable.combineLatest is not a function'
// when change language at this page:)
import 'rxjs/add/observable/combineLatest';
// import { combineLatest } from 'rxjs/observable/combineLatest';
import {
  Order,
  IdNameModel,
  OrdersService,
  CountriesService
} from '../../../core/index';
import { TypesService } from '../../../core/references/types.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  order: Order;

  public countries: Array<IdNameModel> = [];
  public types: Array<IdNameModel> = [];
  @Input() orderId: number;

  constructor(
    private orderService: OrdersService,
    private countriesService: CountriesService,
    private typesService: TypesService
  ) {}

  ngOnInit() {
    Observable.combineLatest(
      this.countriesService.getAllTranslated(),
      this.typesService.getAllTranslated()
    ).subscribe(x => {
      this.countries = x[0];
      this.types = x[1];
    });

    if (this.orderId !== 0) {
      this.orderService.getOrder(this.orderId).subscribe(x => {
        this.order = x;
        this.createEditForm();
      });
    } else {
      this.createNewForm();
    }
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  get name() {
    return this.form.get('name');
  }
  get type() {
    return this.form.get('type');
  }
  get country() {
    return this.form.get('country');
  }
  get count() {
    return this.form.get('count');
  }

  createNewForm() {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      type: new FormControl(null, [Validators.required]),
      country: new FormControl(null, Validators.required),
      count: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(15)
      ])
    });
  }

  createEditForm() {
    this.form = new FormGroup({
      name: new FormControl(this.order.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      type: new FormControl(this.order.type, [Validators.required]),
      country: new FormControl(this.order.country, Validators.required),
      count: new FormControl(this.order.count, [
        Validators.required,
        Validators.min(1),
        Validators.max(15)
      ])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.orderService.createOrUpdate(
        Object.assign({}, this.order, this.form.value)
      );
    }
  }
}
