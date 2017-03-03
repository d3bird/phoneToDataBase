import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user'
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  public currentUser: User;

  constructor(private storage: Storage) {
  }

  public setupCurrentUser(){
    return new Promise((resolve, reject) => {
      this.storage.get('currentUser').then((returnedUser) => {
        this.currentUser = returnedUser;
        console.log('UserService currentUser set');
        resolve(this.currentUser);
      }, () => {
        this.currentUser = null;
        reject(null);
      });
    });
  }

  public registerCurrentUser(updatedCurrentUserInfo: User) {
    this.currentUser = updatedCurrentUserInfo;
    this.storage.set('currentUser', this.currentUser);
  }

  public clearCurrentUser() {
    this.currentUser = null;
    this.storage.remove('currentUser');
  }
}
