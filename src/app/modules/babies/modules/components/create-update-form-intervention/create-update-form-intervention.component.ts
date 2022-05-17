import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CreateUpdateInterventionDTO } from '~modules/interventions/dto/create-update-intervention.dto';
import { Intervention } from '~modules/interventions/entities/interventions.entity';
import { InterventionStateEnum, reverseInterventionStateEnumTranslation, translateInterventionStateEnum } from '~modules/interventions/enums/intervention-state.enum';
import { UserListItem } from '~modules/users/entities/user.list-item.entity';
import { UsersService } from '~modules/users/services/users.service';
import { CustomDateAdapter } from '~modules/utils/customDateAdapter';

@Component({
  selector: 'app-create-update-form-intervention',
  templateUrl: './create-update-form-intervention.component.html',
  styleUrls: ['./create-update-form-intervention.component.scss'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ]
})
export class CreateUpdateFormInterventionComponent implements OnInit {

    @Input()
    intervention: Intervention;

    @Output()
    submitted = new EventEmitter<CreateUpdateInterventionDTO>();

    @Output()
    cancelled = new EventEmitter<void>();

    descriptionFormGroup: FormGroup;
    planificationFormGroup: FormGroup;
    customerFormGroup: FormGroup;
    statusForm: FormGroup;

    users$: Observable<UserListItem[]>;

    statesEnum = [
        translateInterventionStateEnum(InterventionStateEnum.TO_PLAN),
        translateInterventionStateEnum(InterventionStateEnum.PLANNED)
    ];

    constructor(
        private readonly usersService: UsersService
    ) {
        this.users$ = usersService
            .listAll$()
            .pipe(shareReplay());
    }

    ngOnInit(): void {
        if (this.intervention.state == null) {
            this.intervention.state = InterventionStateEnum.TO_PLAN;
        }


        this.statusForm = new FormGroup({
            state: new FormControl(translateInterventionStateEnum(this.intervention.state)),
        });
        this.descriptionFormGroup = new FormGroup({
            label: new FormControl(this.intervention.label, Validators.required)
        });


        this.customerFormGroup = new FormGroup({
            siteCorrespondant: new FormControl(this.intervention.siteCorrespondant),
            siteContact: new FormControl(this.intervention.siteContact),
            signatoryName: new FormControl(this.intervention.signatoryName),
            signatoryRole: new FormControl(this.intervention.signatoryRole),
        });

        this.planificationFormGroup = new FormGroup({
            interventionDate: new FormControl(this.intervention.interventionDate),
            beginTime: new FormControl(this.intervention.beginTime),
            endTime: new FormControl(this.intervention.endTime),
            interventionSupervisor: new FormControl(this.intervention.supervisorUser),
            interventionMembers: new FormControl(this.intervention.membersUser || []),
        });

    }

    canSubmit(): boolean {
        this.descriptionFormGroup.updateValueAndValidity();
        this.planificationFormGroup.updateValueAndValidity();
        this.customerFormGroup.updateValueAndValidity();
        this.statusForm.updateValueAndValidity();
        return this.descriptionFormGroup.valid
            && this.planificationFormGroup.valid
            && this.customerFormGroup.valid
            && this.statusForm.valid;
    }

    compareUsers(a: UserListItem, b: UserListItem): boolean {
        if (a == null || b == null) {
            return false;
        }
        return a.id === b.id;
    }

    submit(): void {
        const canSubmit = this.canSubmit();

        if (canSubmit === true) {
            const descriptionValues = this.descriptionFormGroup.value;
            const planificationValues = this.planificationFormGroup.value;
            const customerValues = this.customerFormGroup.value;
            const statusValue = this.statusForm.value;

            const createUpdateIntervention: CreateUpdateInterventionDTO = {
                label: descriptionValues.label,
                interventionDate: planificationValues.interventionDate,
                beginTime: planificationValues.beginTime,
                endTime: planificationValues.endTime,
                supervisorUserId: planificationValues.interventionSupervisor.id,
                membersUserId: planificationValues.interventionMembers?.map((member: UserListItem) => member.id),

                siteCorrespondant: customerValues.siteCorrespondant,
                siteContact: customerValues.siteContact,
                signatoryName: customerValues.signatoryName,
                signatoryRole: customerValues.signatoryRole,
                state: reverseInterventionStateEnumTranslation(statusValue.state)
            };

            this.submitted.next(createUpdateIntervention);
        } else {
            console.error('An error occured');
        }
    }

    cancel(): void {
        this.cancelled.next();
    }

}
