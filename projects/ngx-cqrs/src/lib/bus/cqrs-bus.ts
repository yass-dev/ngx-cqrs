import {inject, Injector, Type} from "@angular/core";
import {CqrsMessage} from "../model/cqrs-message";
import {CqrsHandler} from "../interface/cqrs-handler";
import {Observable, Subject} from "rxjs";

export abstract class CqrsBus<
    MessageType extends CqrsMessage,
    HandlerType extends CqrsHandler<MessageType, HandlerResultType>,
    HandlerResultType = void,
    ResultType = void>
{
  protected _handlerInstanceByMessageType: Map<Type<MessageType>, HandlerType> = new Map<Type<MessageType>, HandlerType>();
  private readonly _appInjector: Injector = inject(Injector);
  private readonly _source$: Subject<MessageType> = new Subject<MessageType>();

  protected constructor(handlerRegistry: Set<Type<HandlerType>>, messageTypeMetadataKey: string) {
    this._initializeHandlerInstances(handlerRegistry, messageTypeMetadataKey);
  }

  public abstract publish(event: CqrsMessage): Promise<ResultType>;

  public publishAll(messages: CqrsMessage[]): Promise<ResultType[]> {
    return Promise.all(messages.map(this.publish.bind(this)));
  }

  public getSource(): Observable<MessageType> {
    return this._source$.asObservable();
  }

  protected _getHandlerByMessage(message: MessageType): HandlerType | null {
    const messageType: Type<MessageType> = message.constructor as Type<MessageType>;
    return this._handlerInstanceByMessageType.get(messageType) ?? null;
  }

  private _initializeHandlerInstances(handlerRegistry: Set<Type<HandlerType>>, messageTypeMetadataKey: string): void {
    handlerRegistry.forEach((commandHandlerClass: Type<HandlerType>) => {
      const handlerInstance: HandlerType = this._appInjector.get(commandHandlerClass);
      const handledCommand: Type<MessageType> | Type<MessageType>[] = Reflect.getMetadata(messageTypeMetadataKey, commandHandlerClass);
      if (Array.isArray(handledCommand)) {
        handledCommand.forEach((handledCommand: Type<MessageType>) => this._handlerInstanceByMessageType.set(handledCommand, handlerInstance));
      } else {
        this._handlerInstanceByMessageType.set(handledCommand, handlerInstance);
      }
    });
  }
}
