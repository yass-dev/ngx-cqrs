import {Component} from "@angular/core";
import {CqrsCommandBus} from 'ngx-cqrs';
import {CreateProductCommand} from "./message/command/create-product.command";

@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  public constructor(private readonly _commandBus: CqrsCommandBus) {}

  public createNewProduct(): void {
    const productName: string = window.prompt("Product name:") ?? '';
    const productPrice: number = parseFloat(window.prompt("Product price:") ?? '0');
    this._commandBus.publish(new CreateProductCommand(productName, productPrice));
  }
}
