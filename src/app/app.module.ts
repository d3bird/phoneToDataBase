import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';




import { AngularFireModule } from 'angularfire2';
import { LinkyModule } from 'angular-linky';




export const firebaseConfig = {
  apiKey: "AIzaSyBijqkirye06jhdJgHkcO8pkqn0wv-srFU",
    authDomain: "seversidecomands.firebaseapp.com",
    databaseURL: "https://seversidecomands.firebaseio.com",
    projectId: "seversidecomands",
    storageBucket: "seversidecomands.appspot.com",
    messagingSenderId: "1077831140466"
};





@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    LinkyModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
