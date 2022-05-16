import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import { UserRole } from '~modules/users/entities/user-role.enum';
import { UsersService } from '~modules/users/services/users.service';
import {User} from '~modules/users/entities/user.entity';
import {CreateUserDTO} from '~modules/users/dto/create-user.dto';
import { Title } from '@angular/platform-browser';


const rolesChoices = [
  {
    label: 'Planificateur',
    role: UserRole.Planner,
  }, {
    label: 'Technicien',
    role: UserRole.Technician,
  }, {
    label: 'Non attribué',
    role: UserRole.NotGranted,
  }];

type State = 'LOADING' | 'RAW' | 'CREATING' | 'SUCCESS';

@Component({
  selector: 'app-add-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  innerState: State = 'LOADING';
  choices = rolesChoices;
  id = this.route.snapshot.paramMap.get('id');
  emailIsAlreadyExisting = false;
  alreadyExistingEmail = '';
  usernameIsAlreadyExisting = false;
  alreadyExistingUsername = '';

  constructor(
    private titleService: Title,
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Utilisateur');
  }

  ngOnInit(): void {
    this.usersService.getOneById$(this.id)
      .pipe(take(1))
      .subscribe({
        next: (user: User) => {
          this.titleService.setTitle(`Utilisateur - ${user.firstName} ${user.lastName}`);
          this.form = new FormGroup({
            firstName: new FormControl(user.firstName, Validators.required),
            lastName: new FormControl(user.lastName, Validators.required),
            email: new FormControl(user.email, Validators.email),
            role: new FormControl(user.role, Validators.required),
          });
          this.innerState = 'RAW';
        },
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


  updateUser(): void {
    if (this.form.valid) {
      this.emailIsAlreadyExisting = false;
      this.usernameIsAlreadyExisting = false;
      this.innerState = 'CREATING';

      const data: CreateUserDTO = this.form.value;
      this.usersService
          .updateOne$(this.id, data)
          .pipe(
          ).subscribe({
            next: () => {
              this.innerState = 'SUCCESS';
            },
            error: (err: HttpErrorResponse) => this.handleHttpError(err)
          });
    }
  }
}
