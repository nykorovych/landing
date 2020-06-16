import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
    this.messages = new Subject<Command>().pipe(
      scan((acc, value) => {
        if (value.type === 'clear') {
          return acc.filter((el) => el.id !== value.id);
        } else {
          return [...acc, value];
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
