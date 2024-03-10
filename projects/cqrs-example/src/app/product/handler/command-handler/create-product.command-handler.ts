import {Injectable} from "@angular/core";
import {CreateProductCommand} from "../../message/command/create-product.command";
import {ProductCreatedEvent} from "../../message/event/product-created.event";
import {CqrsCommandHandler} from "ngx-cqrs/lib/interface/cqrs-command-handler";
import {CqrsEvent} from "ngx-cqrs/lib/model/cqrs-event";
import {CommandHandler} from "ngx-cqrs";
import {ProductService} from "../../product.service";
import {Product} from "../../model/product";

@Injectable({
  providedIn: 'root'
})
@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements CqrsCommandHandler<CreateProductCommand> {
  public constructor(private readonly _productService: ProductService) {}


  public async execute(command: CreateProductCommand): Promise<CqrsEvent[]> {
    const createdProductId: string = this._productService.createNewProduct(command.name, command.price);
    return [new ProductCreatedEvent(createdProductId)];
  }
}
