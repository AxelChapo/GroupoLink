import { Component, OnInit } from '@angular/core';
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

  userForm: FormGroup

  constructor() {

    let checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
      let pass = group.get('password')?.value;
      let confirmPass = group.get('passwordCheck')?.value
      return pass === confirmPass ? null : { notSame: true }
    }

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

  onFormSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid){
      console.log('formulaire OK');
    } else {
      console.log('erreur formulaire');
    }
  }

}
