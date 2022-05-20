import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '~modules/auth/auth.module';
import { JwtInterceptor } from '~modules/auth/helpers/jwt.interceptor';
import { ErrorsManagementModule } from '~modules/errors-management/errors-management.module';
import { HttpErrorsInterceptor } from '~modules/errors-management/interceptors/http-errors.interceptor';
import { UsersModule } from '~modules/users/module/users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localeFr from '@angular/common/locales/fr';
import { AnonLayoutComponent } from './layouts/anon-layout/anon-layout.component';
import { LoggedLayoutComponent } from './layouts/logged-layout/logged-layout.component';
import { ConfirmationDialogModule } from './shared-components/confirmation-dialog/confirmation-dialog.module';

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    AnonLayoutComponent,
    LoggedLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    HttpClientModule,
    ErrorsManagementModule,
    UsersModule.forRoot(),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ConfirmationDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
