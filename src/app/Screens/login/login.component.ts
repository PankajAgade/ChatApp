import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { AppDataService } from 'src/app/Services/app-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private appDataService: AppDataService,private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email !== "" && this.password !== "") {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password).then(res => {
        const uid = res.user.uid;

        getDocs(query(collection(getFirestore(), "Users"), where("uid", "==", uid))).then(userRes => {
          if (!userRes.empty) {
            const user = userRes.docs[0].data();
            this.appDataService.SetLoginUser(user);
            this.router.navigateByUrl("/users");
          } else {
            alert("Something went wrong plz try again.")
          }
        })

      }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      })
    }

  }
  Register(){
    this.router.navigateByUrl('register')
  }
}
