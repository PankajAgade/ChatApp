import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { environment } from "../environments/environment";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatApp';
  constructor(){
    const app = initializeApp(environment.firebaseConfig);
    console.log(app);
    
  }
}
