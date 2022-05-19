import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';





const routes: Routes = [
    {
        path: 'sign-in',
        pathMatch: 'full',
        component: SignInComponent,
    }, {
        path: 'sign-up',
        pathMatch: 'full',
        component: SignUpComponent,
    }, {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in',
    },
    {
        path: 'update-password',
        component: UpdatePasswordComponent,
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
    ],
    declarations: [
        SignInComponent,
        UpdatePasswordComponent,
        SignUpComponent,
    ]
})
export class AuthPagesModule { }
