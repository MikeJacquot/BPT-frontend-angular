import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthenticationService } from '~modules/auth/services/authentication.service';
import { UsersService } from '~modules/users/module/users/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  passwordIsVisible = false;
  userIsAlreadyExisting = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  signUp() {
    if(this.signUpForm.valid){
      this.usersService.createOne$(this.signUpForm.value).pipe(take(1)).subscribe(() => {
        this.router.navigateByUrl('auth/sign-in');
      });
    }
  }

  getPasswordType(): string {
    return this.passwordIsVisible ? 'text' : 'password';
  }

}
