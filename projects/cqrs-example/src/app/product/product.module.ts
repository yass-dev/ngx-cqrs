import {NgModule} from "@angular/core";
import {ProductService} from "./product.service";
import {ProductComponent} from "./product.component";
import {CreateProductCommandHandler} from "./handler/command-handler/create-product.command-handler";
import {ProductCreatedEventHandler} from "./handler/event-handler/product-created.event-handler";
import {GetProductQueryHandler} from "./handler/query-handler/get-product.query-handler";
import {NgxCqrsModule} from "ngx-cqrs";

@NgModule({
  imports: [NgxCqrsModule],
  providers: [ProductService, CreateProductCommandHandler, ProductCreatedEventHandler, GetProductQueryHandler],
  declarations: [ProductComponent],
  exports: [ProductComponent]
})
export class ProductModule {}
