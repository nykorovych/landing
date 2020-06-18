import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  text?: string;
  type: 'success' | 'error' | 'clear';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((accum: Command[], value: Command) => {
        if (value.type === 'clear') {
          return accum.filter((el) => el.id !== value.id);
        } else {
          return [...accum, value];
        }
      }, [])
    );
  }
  // getMessages() {
  //   return this.messages.pipe(
  //     scan((accum: Command[], value: Command) => {
  //       if (value.type === 'clear') {
  //         return accum.filter((el) => el.id !== value.id);
  //       } else {
  //         return [...accum, value];
  //       }
  //     }, [])
  //   );
  // }

  addSuccess(message: string) {
    const id = this.randomId()
    this.messagesInput.next({
      id,
      text: message,
      type: 'success',
    })
    setTimeout(() => {this.clearMessage(id)},5000)
  }
  addError(message: string) {
    const id = this.randomId()
    this.messagesInput.next({
      id,
      text: message,
      type: 'error',
    });
    setTimeout(() =>{this.clearMessage(id)},5000)
  }
  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }
  randomId() {
    return Math.round(Math.random() * 1000);
  }
}
