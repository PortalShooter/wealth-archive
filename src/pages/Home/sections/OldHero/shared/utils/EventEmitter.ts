export interface Event {
  type: string;
  payload?: object;
}

export interface Handler<E> {
  (event: E): void;
}

interface PendingHandler<E> {
  pending: "add" | "remove";
  handler: Handler<E>;
}

/**
 * Basic EventEmitter. You can subscribe a callback, unsubscribe it or dispatch an event, calling all the subscribed handlers
 */
export interface EventEmitter<E extends Event> {
  /**
   * Dispatch an event
   * @param event Event to dispatch
   */
  dispatch: (event: E) => void;
  /**
   * Subscribe the function to EventEmmiterr
   * @param handler Callback function
   */
  subscribe: (handler: Handler<E>) => void;
  /**
   * Unsubscribe the function from EventEmmiterr
   * @param handler Callback function
   */
  unsubscribe: (handler: Handler<E>) => void;
}

export class EventEmitter<E extends Event> {
  private handlers: Array<Handler<E>> = [];
  private pendingHandlers: Array<PendingHandler<E>> = [];
  private frozen = 0;

  dispatch = (event: E) => {
    Object.freeze(Event);
    this.frozen++;

    this.handlers.forEach(handler => handler(event));

    this.frozen--;

    if (!this.frozen) {
      this.pendingHandlers.forEach((pendingHandler) => {
        if (pendingHandler.pending === "add") {
          this.subscribe(pendingHandler.handler);
        } else if (pendingHandler.pending === "remove") {
          this.unsubscribe(pendingHandler.handler);
        }
      });

      this.pendingHandlers = [];
    }
  };

  subscribe = (handler: Handler<E>) => {
    if (this.frozen) {
      this.pendingHandlers.push({
        pending: "add",
        handler: handler,
      });
      return;
    }

    if (this.handlers.indexOf(handler) === -1) {
      this.handlers.push(handler);
    } else {
      console.log(handler);
      throw new Error("handler was already subscribed");
    }
  };

  unsubscribe = (handler: Handler<E>) => {
    if (this.frozen) {
      this.pendingHandlers.push({
        pending: "remove",
        handler: handler,
      });
      return;
    }

    if (this.handlers.indexOf(handler) === -1) {
      console.log(handler);
      throw new Error("handler was never subscribed");
    }
    this.handlers = this.handlers.filter((filteredHandler) => {
      return filteredHandler !== handler;
    });
  };
}
