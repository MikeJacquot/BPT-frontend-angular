import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';



@NgModule({
  imports: [MatIconModule, MatDialogModule, MatButtonModule, MatDialogModule],
  declarations: [ConfirmationDialogComponent],
  exports: [
    ConfirmationDialogComponent,
  ],
  providers: []
})
export class ConfirmationDialogModule { }
