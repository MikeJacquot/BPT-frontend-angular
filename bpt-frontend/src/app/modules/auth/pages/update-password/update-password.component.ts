import { AuthenticationService } from '~modules/auth/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

class ConfirmNewPasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.touched);
    const mismatch = !!(control && control.parent && control.parent.hasError('mismatch'));
    return (invalidCtrl || mismatch);
  }
}

enum LOGIN_FORM_STATUS {
  RAW,
  APPLYING,
  SUCCESS,
  ERROR
}

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  LOGIN_FORM_STATUS = LOGIN_FORM_STATUS;

  updatePasswordForm: FormGroup;
  updatePasswordFormStatus: LOGIN_FORM_STATUS = LOGIN_FORM_STATUS.RAW;
  updatePasswordFormErrorMessage: string = null;
  oldPasswordIsVisible = false;
  newPasswordIsVisible = false;
  confirmNewPasswordIsVisible = false;

  confirmNewPasswordMatcher: ConfirmNewPasswordMatcher = new ConfirmNewPasswordMatcher();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private titleService: Title
  ) { this.titleService.setTitle('Modifier mot de passe'); }

  ngOnInit(): void {
    this.updatePasswordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [
          Validators.required
        ]),
        newPassword: new FormControl('', [
          Validators.required
        ]),
        confirmNewPassword: new FormControl('', [
          Validators.required
        ])
      },
      this.passwordMatchValidator
    );
  }

  passwordMatchValidator(formGroup: FormGroup): null | {mismatch: boolean} {
    return formGroup.get('newPassword').value === formGroup.get('confirmNewPassword').value
       ? null : {mismatch: true};
 }

  login(): void {
    this.updatePasswordFormStatus = LOGIN_FORM_STATUS.APPLYING;

    this.authService
      .changeUserPassword(this.updatePasswordForm.get('oldPassword').value, this.updatePasswordForm.get('newPassword').value)
      .pipe(
        take(1)
      )
      .subscribe(
        () => {
          this.updatePasswordFormStatus = LOGIN_FORM_STATUS.SUCCESS;
          setTimeout(() => {
              this.router.navigate(['/app/dashboard']); },
            5000);

        },
        (err) => {
          this.updatePasswordFormStatus = LOGIN_FORM_STATUS.ERROR;
          this.updatePasswordFormErrorMessage = err.error.message;
        }
      );
  }

  getOldPasswordType(): string {
    return this.oldPasswordIsVisible ? 'text' : 'password';
  }

  getNewPasswordType(): string {
    return this.newPasswordIsVisible ? 'text' : 'password';
  }

  getConfirmNewPasswordType(): string {
    return this.confirmNewPasswordIsVisible ? 'text' : 'password';
  }

}
