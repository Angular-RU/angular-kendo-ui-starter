import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/index';
import { LoginComponent } from './features/login/login/login.component';
import { MenuComponent } from './features/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'order',
            loadChildren: './features/order/order.module#OrderModule'
          },
          {
            path: 'orders',
            loadChildren: './features/orders/orders.module#OrdersModule'
          },
          {
            path: 'reference',
            loadChildren:
              './features/reference/reference.module#ReferenceModule'
          }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
