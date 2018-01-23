import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesTableComponent } from './types/types-table.component';
import { CountiesTableComponent } from './countries/countries-table.component';

const routes: Routes = [
  { path: 'types', component: TypesTableComponent },
  { path: 'countries', component: CountiesTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceRoutingModule {}
