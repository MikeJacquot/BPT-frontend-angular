import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '~modules/auth/helpers/auth.guard';
import { AnonLayoutComponent } from './layouts/anon-layout/anon-layout.component';
import { LoggedLayoutComponent } from './layouts/logged-layout/logged-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AnonLayoutComponent,
    loadChildren: () => import('./modules/auth/pages/auth.pages.module').then(m => m.AuthPagesModule),
  }, {
    path: 'app',
    component: LoggedLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [{
      path: 'families',
      loadChildren: () => import('./modules/families/pages/families.pages.module').then(m => m.FamiliesPagesModule),
    }, {
      path: 'users',
      loadChildren: () => import('./modules/users/pages/users.pages.module').then(m => m.UsersPagesModule),
    }
  ]
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/families',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
