import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CreateUserDTO } from '~modules/users/module/users/dto/create-user.dto';
import { User } from '~modules/users/module/users/entities/user.entity';
import { UsersService } from '~modules/users/module/users/services/users.service';



type State = 'LOADING' | 'RAW' | 'CREATING' | 'SUCCESS';

@Component({
  selector: 'app-add-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  innerState: State = 'LOADING';

  id = this.route.snapshot.paramMap.get('id');
  emailIsAlreadyExisting = false;
  alreadyExistingEmail = '';

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
            email: new FormControl(user.email, [Validators.required, Validators.email]),
            firstName: new FormControl(user.firstName, Validators.required),
            lastName: new FormControl(user.lastName, Validators.required),
          });
          this.innerState = 'RAW';
        },
      });
  }

  handleHttpError(err: HttpErrorResponse): void {
    this.form.markAsTouched();
    this.form.markAsDirty();
    const HTTP_CONFLICT_ERROR_CODE = 409;

    if (err.status === HTTP_CONFLICT_ERROR_CODE) {
      this.innerState = 'RAW';
      console.error(err.error.type);
        this.alreadyExistingEmail = this.form.get('email').value;
        this.emailIsAlreadyExisting = true;
      
    }
  }


  updateUser(): void {
    if (this.form.valid) {
      this.emailIsAlreadyExisting = false;
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
