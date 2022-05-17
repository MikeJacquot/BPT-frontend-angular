import { NgModule } from '@angular/core';
import { BabiesService } from './services/babies.services';
import { FamiliesComponent } from './test/families/families.component';

@NgModule({
  declarations: [
  
    FamiliesComponent
  ],
  providers: [
    BabiesService
  ],
  exports: [
  ]
})
export class BabiesModule {}
