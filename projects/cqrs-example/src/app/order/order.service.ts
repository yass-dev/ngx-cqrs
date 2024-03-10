import {Injectable} from "@angular/core";
import {CreateOrderCommand} from "./command/create-order.command";
import {CqrsCommandBus} from "ngx-cqrs";

@Injectable()
export class OrderService {
  public constructor(private readonly _cqrsCommandBus: CqrsCommandBus) {
    this._cqrsCommandBus.publish(new CreateOrderCommand());
  }
}
