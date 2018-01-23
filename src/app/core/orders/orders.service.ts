import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    new Order(1, 1, new Date(), 1, 'first', 2),
    new Order(2, 2, new Date(), 2, 'second', 9),
    new Order(3, 3, new Date(), 3, 'third', 14),
    new Order(4, 1, new Date(), 3, 'foo2', 1),
    new Order(5, 3, new Date(), 1, 'foo3', 2),
    new Order(6, 2, new Date(), 2, 'goo1', 3),
    new Order(7, 2, new Date(), 1, 'goo2', 4),
    new Order(8, 3, new Date(), 1, 'goo3', 5),
    new Order(9, 1, new Date(), 3, 'bla1', 7),
    new Order(10, 1, new Date(), 2, 'bla2', 8),
    new Order(11, 2, new Date(), 1, 'bla3', 9),
    new Order(12, 1, new Date(), 3, 'bla4', 99)
  ];

  items$: Observable<Order[]> = Observable.from([this.orders]);

  public getOrders(): Observable<Order[]> {
    return this.items$;
  }

  public getOrder(id: number): Observable<Order> {
    return this.items$.pipe(map(x => x.filter(y => y.id === id)[0]));
  }

  public createOrUpdate(order: Order) {
    if (order.id) {
      const old = this.orders.find(x => x.id === order.id);
      Object.assign(old, order);
    } else {
      order.id = Math.max(...this.orders.map(x => x.id)) + 1;
      order.createdDate = new Date();
      this.orders.push(order);
    }
  }
}
