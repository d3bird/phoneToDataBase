import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Message } from '../../models/message'
import { MessageService } from '../../providers/message-service'
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
export const imageContentPrefix = 'data:image/jpeg;base64,';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MessageService, Camera, Geolocation,Platform]
})
export class HomePage {
  public USER_NAME_CONSTANT = 'Scott Crawford';
  public currentMessage: string;

  constructor(public navCtrl: NavController, private messageService: MessageService, private camera: Camera, private geolocation: Geolocation,public plt: Platform) {
  }

  public formatDateTo_hhmm(dateProvidedAsString: string) {
    return moment(new Date(dateProvidedAsString)).format('h:mm a');
  }

  public send() {
    this.buildAndSendMessage(this.currentMessage);
    this.currentMessage = "";
  }

  public doesThisMessageContainAnImage(message: Message) {
    return message.messageContent.indexOf(imageContentPrefix) !== -1;
  }
  public getImageFromMessageContent(message: Message) {
    return this.doesThisMessageContainAnImage(message) ? message.messageContent : "";
  }

public randomTest(){


}

  public getPhoto() {

    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 600,
      targetHeight: 400
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData.replace(/[\n\r]/g, '');
      this.buildAndSendMessage(base64Image);
    }, (err) => {
      this.buildAndSendMessage("camera not found");
      this.currentMessage = "";
    });
  }


  private buildAndSendMessage(message: string) {
    var newMessage = new Message();
    newMessage.userName = this.USER_NAME_CONSTANT;
    newMessage.messageContent = message;
    this.messageService.addMessage(newMessage);
  }

  public displayGeo(temp:string){
    let lat :string = temp.substring(4,temp.indexOf(","));
    let long:string= temp.substring(temp.indexOf(",")+1);
    let output:string="";

    if(this.plt.is('ios')){
    output =  'https://maps.apple.com/?q='+lat+','+long;
    }else{
   output=   'https://maps.google.com/maps?q=loc:'+lat+','+long;
    }
     return output;

  }

  
  public getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      let temp: string = "geo" + ":" + resp.coords.latitude + "," + resp.coords.longitude;
     // this.buildAndSendMessage(temp);
     this.buildAndSendMessage(temp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

}

