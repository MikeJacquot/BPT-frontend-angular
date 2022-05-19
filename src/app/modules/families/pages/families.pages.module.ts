import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CreateFamilyComponent } from './families/create-family-component/create-family.component';
import { FamiliesComponent } from './families/families.component';



const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: FamiliesComponent,
  }, {
    path: 'create',
    pathMatch: 'full',
    component: CreateFamilyComponent,
}
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      CommonModule,
      FormsModule,
      MatFormFieldModule,

      MatCardModule,
      MatDividerModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatChipsModule,
      MatSelectModule,
      MatStepperModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatMenuModule,
      MatSnackBarModule,
      FileUploadModule,


  ],
  declarations: [
      FamiliesComponent,
      CreateFamilyComponent,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class FamiliesPagesModule { }
