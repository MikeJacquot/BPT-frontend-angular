import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Error } from '../entities/error.entity';

@Component({
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent {

    errorData: Error;
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: Error,
        public matSnackBarRef: MatSnackBarRef<ErrorSnackbarComponent>
    ) {
        this.errorData = data;
    }
}
