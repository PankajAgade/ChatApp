import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
import { AppDataService } from 'src/app/Services/app-data.service';
// import { AppHeaderComponent } from "../app-header/app-header.component";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  user:any = null;

  constructor(private appDataService:AppDataService,private router:Router) {}

  async setData() {
    const userRef = collection(getFirestore(), 'Users');
    addDoc(userRef, { name: "Swati", id: 3 }).then(console.log).catch(console.error)

  }

  ngOnInit(): void {

    this.appDataService.getLoginUser().subscribe(_user=>{
      // console.log({_user});
      if (_user) {
        this.user=_user;
        this.getUsersData();
      }
    })
    
  }

  async getUsersData() {
    const docRef = query(collection(getFirestore(), "Users"),where('uid','!=',this.user.uid));
    const docSnap = await getDocs(docRef);
    this.users = docSnap.docs.map(m => m.data());
  }

  goToRoom(opponentUser:any){
    this.appDataService.getUserMessageRoom(opponentUser,this.user).then(res=>{
      if (!res.exists()) {
        //* Create Room 😡
        this.appDataService.createRoom(opponentUser,this.user).then(created_Room=>{
          this.goToRoom(opponentUser);
        })
      }else{
        // Redirect room 😍
        this.router.navigateByUrl(`room/${res.id}`);
      }
    })
    
  }
}
