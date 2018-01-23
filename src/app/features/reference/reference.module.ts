import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TypesTableComponent } from './types/types-table.component';
import { CountiesTableComponent } from './countries/countries-table.component';
import { ReferenceTableComponent } from './common/reference-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReferenceRoutingModule } from './reference-routing.module';

@NgModule({
  imports: [SharedModule, ReferenceRoutingModule],
  declarations: [
    TypesTableComponent,
    CountiesTableComponent,
    ReferenceTableComponent
  ]
})
export class ReferenceModule {}
