import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { ListBabiesComponent } from './list-babies/list-babiescomponent';
import { CreateBabyComponent } from './create-baby/create-baby.component';




const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ListBabiesComponent,
    }, {
        path: 'create',
        pathMatch: 'full',
        component: CreateBabyComponent,
    }, {

        path: ':babyId/edit',
        component: CreateBabyComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule,

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
        MatSnackBarModule
    ],
    declarations: [
        ListBabiesComponent,
        CreateBabyComponent,
    ],
    providers: [
    ],
    exports: [
    ]
})
export class BabiesPagesModule { }
