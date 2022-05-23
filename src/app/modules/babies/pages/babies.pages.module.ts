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
import { CreateUpdateBabyComponent } from './create-baby/create-update-baby.component';
import { BabyDetailComponent } from './baby-detail/baby-detail.component';




const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ListBabiesComponent,
    }, {
        path: 'create',
        pathMatch: 'full',
        component: CreateUpdateBabyComponent,
    }, {
        path: ':babyId/edit',
        pathMatch: 'full',
        component: CreateUpdateBabyComponent,
    }, {
        path: ':babyId',
        component: BabyDetailComponent,
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
        CreateUpdateBabyComponent,
        BabyDetailComponent,
    ],
    providers: [
    ],
    exports: [
    ]
})
export class BabiesPagesModule { }
