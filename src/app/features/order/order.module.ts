import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SharedModule } from '../../shared/shared.module';
import { OrderDetailsComponent } from './details/order-details.component';
import { OrderFooComponent } from './foo/order-foo.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './main/order.component';

@NgModule({
  imports: [SharedModule, NgbModule, OrderRoutingModule],
  declarations: [OrderComponent, OrderDetailsComponent, OrderFooComponent]
})
export class OrderModule {}
