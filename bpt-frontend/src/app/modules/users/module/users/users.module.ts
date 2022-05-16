import { NgModule, ModuleWithProviders } from '@angular/core';
import { UsersService } from './services/users.service';
@NgModule({})
export class UsersModule {
  static forRoot(): ModuleWithProviders<UsersModule> {
    return {

      ngModule: UsersModule,

      providers: [
        UsersService,
      ],
    };
   }
}
