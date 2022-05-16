import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonLayoutComponent } from './layouts/anon-layout/anon-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AnonLayoutComponent,
    loadChildren: () => import('./modules/auth/pages/auth.pages.module').then(m => m.AuthPagesModule),
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
