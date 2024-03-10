import {Injectable} from "@angular/core";
import {Product} from "./model/product";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class ProductService {
  private productByProductId: Map<string, Product> = new Map();

  public constructor() {}

  public createNewProduct(name: string, price: number): string {
    const createdProduct: Product = new Product(uuidv4(), name, price);
    this.productByProductId.set(createdProduct.id, createdProduct);
    return createdProduct.id;
  }

  public getProductById(productId: string): Product {
    return this.productByProductId.get(productId) as Product;
  }
}
