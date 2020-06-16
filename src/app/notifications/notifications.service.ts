import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators'

interface Command {
  id: number;
  text?: string;
  type: 'success' | 'error' | 'clear';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messages: Subject<Command>;

  constructor() {
    this.messages = new Subject<Command>()
  }
  getMessages() {
    return this.messages.pipe(
      scan((accum: Command[], value: Command) => {
        if (value.type === 'clear') {
          return accum.filter((el) => el.id !== value.id);
        } else {
          return [...accum, value];
        }
      }, [])
    );
  }

  addSuccess(message: string) {
    this.messages.next({
      id: this.randomId(),
      text: message,
      type: 'success',
    });
  }
  addError(message: string) {
    this.messages.next({
      id: this.randomId(),
      text: message,
      type: 'error',
    });
  }
  clearMessage(id: number) {
    this.messages.next({
      id,
      type: 'clear',
    });
  }
  randomId() {
    return Math.round(Math.random() * 1000);
  }
}
