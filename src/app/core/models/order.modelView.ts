import { Order } from './order.model';

export class OrderViewModel extends Order {
  constructor(
    public id: number,
    public country: number,
    public createdDate: Date,
    public type: number,
    public typeName?: string,
    public countryName?: string,
    public name?: string,
    public count?: number
  ) {
    super(id, country, createdDate, type, name, count);
  }
}
