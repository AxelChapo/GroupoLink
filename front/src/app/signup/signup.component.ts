import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;

  constructor() {
    //vérification si les 2 mots de passe sont identiques
    let checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
      let pass = group.get('password')?.value;
      let confirmPass = group.get('passwordCheck')?.value
      return pass === confirmPass ? null : { notSame: true }
    }
    //récupération/vérification des données du form
    this.userForm = new FormGroup({
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z \-]*')]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z \-]*')]),
      birthDate: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordCheck: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, [checkPasswords])
  }

  ngOnInit(): void {
  }

  signupSubmit() {
    //vérification intéraction avec toutes les cases
    this.userForm.markAllAsTouched();
    //appel de l'API si le formulaire est valide
    if (this.userForm.valid){
      fetch('http://localhost:3000/API/auth/signup', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.userForm.value)
      }).then(response => {
        if (response.status === 401) {
          alert("Veuillez remplir tous les champs");
          throw new Error();
          //afficher message erreur
        }
        return response.json();
      }).then(response => {
        // @ts-ignore
        location.replace('');
      });
    }
    //envoi de l'erreur
    else {
      alert("erreur formulaire");
    }
  }
}
