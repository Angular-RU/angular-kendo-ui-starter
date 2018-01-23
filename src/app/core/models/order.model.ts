export class Order {
  constructor(
    public id: number,
    public country: number,
    public createdDate: Date,
    public type: number,
    public name?: string,
    public count?: number
  ) {}
}
