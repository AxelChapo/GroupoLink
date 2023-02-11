import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private auth: AuthService,
              private router: Router) {

    // récupération/vérification des informations du formulaire de connexion
    this.loginForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    },)
  }

  ngOnInit(): void {
  }

  loginSubmit() {
    this.auth.login(); //appel auth.login dans AuthService
    //appel de l'API login
    fetch('http://localhost:3000/API/auth/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.loginForm.value) //envoie des valeur du formulaire à l'API
    }).then(response => {
      if (response.status === 401) {
        alert("identifiant incorrect");
        throw new Error();
        //afficher message erreur

      }
      return response.json();
    }).then(response => {
      // @ts-ignore
      //enregistrement de l'ID et du token du user dans le local storage
      localStorage.setItem('userLoginData', JSON.stringify(response));
      location.replace('/post-feed');
    });
  }
}
