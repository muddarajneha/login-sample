import { Component, OnInit } from '@angular/core';
import { User } from './Welcome';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loggedInUser: string;
  constructor(private welcomeService: WebserviceService, private router: Router) { }
  userList: User[];
  errorMessage: string;

  //display data upon load
  ngOnInit() {
    this.getUserList();
    let username = sessionStorage.getItem('email');
    this.loggedInUser = username.substring(0, username.indexOf("."));
  }

  getUserList() {
    return this.welcomeService.getData().subscribe(
      users => this.userList = users.data,
      error => this.errorMessage = <any>error);
  }

  //remove userdata stored in the session
  logout(){
    sessionStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
