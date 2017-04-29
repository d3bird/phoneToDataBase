import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Message } from '../models/message'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {
  public messages: FirebaseListObservable<any>;

  constructor(private angularFire: AngularFire) {
    this.messages = angularFire.database.list('/messages');
  }

  public addMessage(message: Message) {
    message.messageDate = new Date().toString();
    this.messages.push(message);
  }
}