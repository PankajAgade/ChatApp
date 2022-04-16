import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() back = '';

  constructor(private router:Router,private appDataService:AppDataService) { }

  ngOnInit(): void {
  }

  goBack(){
    if (this.back !== "none") {
      this.router.navigateByUrl(this.back)
    }
  }

  logout(){
    if (confirm("You want logout!")) {
      this.appDataService.logout();
      this.router.navigateByUrl("login");
    }
  }

}
