import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('userEmail') userEmail: ElementRef | undefined;
  @ViewChild('userPassword') userPassword: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  loginSubmit() {
    let userLoginData = {
      email: this.userEmail,
      password: this.userPassword,
    }
    fetch('http://localhost:3000/API/auth/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLoginData)
    }).then(response => response.json()).then(response => {
      // @ts-ignore
      localStorage.setItem('userLoginData', userLoginData);
      location.replace('/post-feed');
    });
  }
}
