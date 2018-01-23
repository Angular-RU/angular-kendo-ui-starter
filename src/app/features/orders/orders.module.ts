import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OrdersTableComponent } from './table/orders-table.component';

const routes: Routes = [{ path: '', component: OrdersTableComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [OrdersTableComponent]
})
export class OrdersModule {}
