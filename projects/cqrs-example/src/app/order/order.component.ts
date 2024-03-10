import {Component} from "@angular/core";
import {OrderService} from "./order.service";

@Component({
  selector: 'order',
  template: '<h1>ORDER COMPONENT</h1>'
})
export class OrderComponent {
  public constructor(order: OrderService) {

  }
}
