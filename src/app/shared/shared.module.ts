import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DropDownListFilterComponent } from './dropdownlist-filter.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    GridModule,
    DropDownsModule
  ],
  declarations: [DropDownListFilterComponent],
  providers: [],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    GridModule,
    DropDownsModule,
    DropDownListFilterComponent
  ]
})
export class SharedModule {}
