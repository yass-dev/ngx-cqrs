export class Order {
  public constructor(public readonly totalAmount: number,
                     public readonly productId: string,
                     public readonly productQuantity: number) {}
}
