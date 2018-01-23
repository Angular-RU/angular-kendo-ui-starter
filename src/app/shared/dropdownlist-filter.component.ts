import {
  BaseFilterCellComponent,
  FilterService
} from '@progress/kendo-angular-grid';
import { Component, Input, OnInit } from '@angular/core';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dropdown-filter',
  template: `
           <kendo-dropdownlist
               [data]="data"
               (valueChange)="onChange($event)"
               [defaultItem]="defaultItem"
               [value]="selectedValue"
               [valuePrimitive]="true"
               [textField]="textField"
               [valueField]="valueField">
           </kendo-dropdownlist>
       `
})
export class DropDownListFilterComponent extends BaseFilterCellComponent
  implements OnInit {
  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;
  @Input() public fieldName: string;
  defaultText: string;

  constructor(
    filterService: FilterService,
    private translate: TranslateService
  ) {
    super(filterService);
  }

  ngOnInit(): void {
    this.translate
      .get('Kendo.FilterDefaultText')
      .subscribe(x => (this.defaultText = x));
  }
  public get defaultItem(): any {
    return {
      [this.textField]: this.defaultText,
      [this.valueField]: null
    };
  }

  public get selectedValue(): any {
    const filter = this.filterByField(this.valueField);
    return filter ? filter.value : null;
  }

  public onChange(value: any): void {
    this.applyFilter(
      value === null
        ? this.removeFilter(this.fieldName)
        : this.updateFilter({
            field: this.fieldName,
            operator: 'eq',
            value: value
          })
    );
  }
}
