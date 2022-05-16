import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@NgModule({})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {

      ngModule: AuthModule,

      providers: [
        AuthenticationService,
      ],
    };
   }
}
