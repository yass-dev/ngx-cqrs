import {GetProductQuery} from "../../message/query/get-product.query";
import {Product} from "../../model/product";
import {CqrsQueryHandler} from "ngx-cqrs/lib/interface/cqrs-query-handler";
import {QueryHandler} from "ngx-cqrs";
import {ProductService} from "../../product.service";
import {Injectable} from '@angular/core';

@QueryHandler(GetProductQuery)
@Injectable()
export class GetProductQueryHandler implements CqrsQueryHandler<GetProductQuery, Product> {
  public constructor(private readonly _productService: ProductService) {}

  public async execute(event: GetProductQuery): Promise<Product> {
    return this._productService.getProductById(event.productId);
  }
}
