import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  password: string = "";
  name: string = "";

  constructor(private router: Router, private appDataService: AppDataService) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('login')
  }
  register() {
    if (this.email !== "" && this.name !== "" && this.password !== "") {
      this.appDataService.registerUser(this.email, this.password).then(_rawUser => {
        const postData = {
          uid: _rawUser.user.uid,
          name: this.name,
          password: this.password,
          email : this.email
        }
        this.appDataService.addUser(postData).then(_user => {
          alert("Register Successfully. plz Login");
          this.router.navigateByUrl('login')
        }).catch(error => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
      }).catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      })
    }
  }
}
