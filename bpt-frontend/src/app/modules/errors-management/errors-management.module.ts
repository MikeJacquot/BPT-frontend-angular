import { NgModule } from '@angular/core';
import { ErrorSnackbarComponent } from './components/error-snackbar.component';
import { SessionErrorsManager } from './services/session-errors-manager.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    declarations: [
        ErrorSnackbarComponent,
    ],
    providers: [
        SessionErrorsManager,
    ],
    exports: [
        ErrorSnackbarComponent,
    ]
})
export class ErrorsManagementModule {}
