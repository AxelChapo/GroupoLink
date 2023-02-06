import { Component, OnInit } from '@angular/core';
import { User } from "../core/models/user.model";
import { AuthService } from "../core/services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getOneProfile();
  }

  getOneProfile() {
    this.auth.login();
    fetch('http://localhost:3000/API/auth/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userLoginData') ?? '{}').token
      },
    }).then(response => response.json()).then(user => this.user = user);
  };
}
