import {NgModule} from "@angular/core";
import {OrderService} from "./order.service";
import {OrderComponent} from "./order.component";
import {CreateOrderCommandHandler} from "./handler/command-handler/create-order.command-handler";
import {OrderCreatedEventHandler} from "./handler/event-handler/order-created.event-handler";
import {GetOrderQueryHandler} from "./handler/query-handler/get-order.query-handler";
import {NgxCqrsModule} from "ngx-cqrs";

@NgModule({
  imports: [NgxCqrsModule],
  providers: [OrderService, CreateOrderCommandHandler, OrderCreatedEventHandler, GetOrderQueryHandler],
  declarations: [OrderComponent],
  exports: [OrderComponent]
})
export class OrderModule {}
