import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './Screens/users/users.component';
import { ChatRoomComponent } from './Screens/chat-room/chat-room.component';
import { LoginComponent } from './Screens/login/login.component';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from './Screens/app-header/app-header.component';
import { RegisterComponent } from './Screens/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ChatRoomComponent,
    LoginComponent,
    AppHeaderComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
