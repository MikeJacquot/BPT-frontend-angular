import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperIntl } from '@angular/material/stepper';
import { MatDatepickerFrenchIntl } from 'src/app/intl/mat-datepicker.french.intl';
import { MatStepperFrenchIntl } from 'src/app/intl/mat-stepper.french.intl';
import { InterventionsModule } from '~modules/interventions/interventions.module';
import { CreateUpdateFormInterventionComponent } from './create-update-form-intervention.component';

@NgModule({
    imports: [
        InterventionsModule,
        CommonModule,
        ReactiveFormsModule,

        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        {provide: MatStepperIntl, useClass: MatStepperFrenchIntl},
        {provide: MatDatepickerIntl, useClass: MatDatepickerFrenchIntl},
    ],
    declarations: [
        CreateUpdateFormInterventionComponent,
    ],
    exports: [
        CreateUpdateFormInterventionComponent,
    ]
})
export class CreateUpdateFormInterventionComponentModule {}
