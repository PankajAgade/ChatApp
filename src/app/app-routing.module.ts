import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './Screens/chat-room/chat-room.component';
import { LoginComponent } from './Screens/login/login.component';
import { RegisterComponent } from './Screens/register/register.component';
import { UsersComponent } from './Screens/users/users.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  {
    path:"",
    pathMatch: 'full',
    redirectTo:"login"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"users",
    component:UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"room/:roomID",
    component:ChatRoomComponent,
    canActivate:[AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
