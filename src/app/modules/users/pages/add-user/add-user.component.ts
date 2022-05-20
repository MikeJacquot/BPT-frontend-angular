import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
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

  emailIsAlreadyExisting = false;
  alreadyExistingEmail = '';
  innerState = 'RAW';


  constructor(
    private titleService: Title,
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) {
    this.titleService.setTitle('Ajouter un utilisateur');
  }

  ngOnInit(): void {
    this.innerState = 'RAW';
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  handleHttpError(err: HttpErrorResponse): void {
    this.form.markAsTouched();
    this.form.markAsDirty();
    const HTTP_CONFLICT_ERROR_CODE = 409;

    if (err.status === HTTP_CONFLICT_ERROR_CODE) {
        this.alreadyExistingEmail = this.form.get('email').value;
        this.emailIsAlreadyExisting = true;
        this.innerState = 'RAW';
      }
    }

  createUser(): void {
    if (this.form.valid) {
      this.emailIsAlreadyExisting = false;
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
