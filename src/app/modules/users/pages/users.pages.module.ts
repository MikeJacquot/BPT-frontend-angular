import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';

import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import {MatMenuModule} from '@angular/material/menu';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ListUsersComponent,
    }, {
        path: 'add',
        component: AddUserComponent,
    },
    {
        path: 'edit',
        component: EditUserComponent,
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
        MatMenuModule,
    ],
    declarations: [
        ListUsersComponent,
        AddUserComponent,
        EditUserComponent,
    ]
})
export class UsersPagesModule {}
