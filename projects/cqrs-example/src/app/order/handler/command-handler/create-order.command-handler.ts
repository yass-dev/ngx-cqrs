import {Injectable} from "@angular/core";
import {CreateOrderCommand} from "../../command/create-order.command";
import {OrderCreatedEvent} from "../../event/order-created.event";
import {CqrsCommandHandler} from "ngx-cqrs/lib/interface/cqrs-command-handler";
import {CqrsEvent} from "ngx-cqrs/lib/model/cqrs-event";
import {CommandHandler} from "ngx-cqrs";

@Injectable({
  providedIn: 'root'
})
@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements CqrsCommandHandler<CreateOrderCommand> {
  execute(command: CreateOrderCommand): Promise<CqrsEvent[]> {
    console.debug(`Handle`, command)
    return Promise.resolve([new OrderCreatedEvent()]);
  }
}
