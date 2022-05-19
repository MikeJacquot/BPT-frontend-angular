import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '@iplab/ngx-file-upload';
import { take } from 'rxjs';
import { FamiliesService } from '~modules/families/modules/families.service';
import { UsersService } from '~modules/users/module/users/services/users.service';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.scss'],
  providers: [FileUploadService]
})
export class CreateFamilyComponent implements OnInit {

  form: FormGroup;
  formIsValid: boolean;
  currentUserId: string;
  familyId: string;

  constructor(private readonly fb: FormBuilder,
    private readonly familiesService: FamiliesService,
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: [null, Validators.required],
        familyRelationShip: [null, Validators.required]
      }
    );
    this.familyId = this.route.snapshot.params.id;
    if(this.familyId !== null && this.familyId !== undefined){
      this.familiesService.getOne$(this.familyId).pipe(take(1)).subscribe((family) => {
        this.form.get('name').setValue(family.name);
        this.form.get('familyRelationShip').setValue(family.familyRelationShip);
      })   
    }
    this.form.valueChanges.subscribe(() => this.formIsValid = this.form.valid);
    const userEmail: string = sessionStorage.getItem('currentUserEmail');
    this.usersService.getOneByEmail$(userEmail).pipe(take(1)).subscribe((user) => this.currentUserId = user.id);
  }

  submit() {
    if(this.formIsValid){
      const familyToSave = this.form.value;
      familyToSave.user = this.currentUserId;
      familyToSave.familyRelationShip = this.form.get('familyRelationShip').value;
      if(this.familyId){
        this.familiesService.updateOne$(this.familyId, familyToSave).pipe(take(1)).subscribe(() => {
          this.router.navigateByUrl('/app/families');
        });
      } else {
        this.familiesService.create$(familyToSave).pipe(take(1)).subscribe(() => {
          this.router.navigateByUrl('/app/families');
        });
      }
      
    }
  }

}
