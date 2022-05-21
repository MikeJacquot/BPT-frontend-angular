import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  badCredentialsError: boolean = null;
  signInInProgress = false;
  passwordIsVisible = false;


  constructor(
    private titleService: Title,
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle('Se connecter');
    // If a user is already connected with a valid token, then redirect user to default page.
    this.authService.isConnected$().pipe(
      first()
    ).subscribe({
      next: (isConnected: boolean) => {
        if (isConnected === true) {
          this.router.navigate(['']);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  async loginSuccess(): Promise<void> {
    this.signInInProgress = false;
    // We use 'navigateByUrl' instead of 'navigate' because 'navigate' needs to separate route and query params
    await this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams.returnUrl || 'app/families');
  }

  loginError(): void {
    this.signInInProgress = false;
    this.badCredentialsError = true;
  }

  login(): void {
    this.signInInProgress = true;
    this.badCredentialsError = false;
    this.authService
      .signIn$(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: this.loginSuccess.bind(this),
        error: this.loginError.bind(this)
      });
  }

  getPasswordType(): string {
    return this.passwordIsVisible ? 'text' : 'password';
  }
}
