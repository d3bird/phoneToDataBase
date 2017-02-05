import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Message } from '../../models/message'
import { MessageService } from '../../providers/message-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ MessageService ]
})
export class HomePage {
  public USER_NAME_CONSTANT = 'John Ryan';
  public currentMessage: string;

  constructor(public navCtrl: NavController, private messageService: MessageService) {
  }

  public send() {
    this.buildAndSendMessage(this.currentMessage);
    this.currentMessage = "";
  }

  private buildAndSendMessage(message: string) {
      var newMessage = new Message();
      newMessage.userName = this.USER_NAME_CONSTANT;
      newMessage.messageContent = this.currentMessage;
      this.messageService.addMessage(newMessage);
  }
}
