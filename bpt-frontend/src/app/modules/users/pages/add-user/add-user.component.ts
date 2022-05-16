import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { CreateUserDTO } from '~modules/users/module/users/dto/create-user.dto';
import { UsersService } from '~modules/users/module/users/services/users.service';

type State = 'RAW' | 'CREATING' | 'SUCCESS';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  form: FormGroup;
  innerState: State = 'RAW';

  emailIsAlreadyExisting = false;
  alreadyExistingEmail = '';
  usernameIsAlreadyExisting = false;
  alreadyExistingUsername = '';

  constructor(
    private titleService: Title,
    private readonly usersService: UsersService,
    private readonly router: Router,
  ) {
    this.titleService.setTitle('Ajouter un utilisateur');
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    });
  }

  handleHttpError(err: HttpErrorResponse): void {
    this.form.markAsTouched();
    this.form.markAsDirty();
    const HTTP_CONFLICT_ERROR_CODE = 409;

    // @TODO: [CALC-361] to improve the readability, replace the const var with an enum
    if (err.status === HTTP_CONFLICT_ERROR_CODE) {
      this.innerState = 'RAW';
      console.error(err.error.type);
      if (err.error.type === 'IsAlreadyExistingWithThisUsername') {
        this.alreadyExistingUsername = this.form.get('username').value;
        this.usernameIsAlreadyExisting = true;
      }
      if (err.error.type === 'IsAlreadyExistingWithThisEmail') {
        this.alreadyExistingUsername = this.form.get('email').value;

        this.emailIsAlreadyExisting = true;
      }
    }
  }


  createUser(): void {
    if (this.form.valid) {
      this.emailIsAlreadyExisting = false;
      this.usernameIsAlreadyExisting = false;

      this.innerState = 'CREATING';

      const data: CreateUserDTO = this.form.value;
      this.usersService
          .createOne$(data)
          .pipe(
            first()
          ).subscribe({
            next: () => {
              this.innerState = 'SUCCESS';
            },
            error: (err: HttpErrorResponse) => this.handleHttpError(err)
          });
    }
  }
}
