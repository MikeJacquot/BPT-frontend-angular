import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { BabiesService } from '~modules/babies/modules/services/babies.services';

@Component({
  selector: 'app-create-baby',
  templateUrl: './create-baby.component.html',
  styleUrls: ['./create-baby.component.scss']
})
export class CreateBabyComponent implements OnInit {

  form: FormGroup;
  formIsValid: boolean;
  familyId: string;
  babyId: string;

  constructor(private readonly fb: FormBuilder,
    private readonly babiesService: BabiesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      birthLocation: [null, Validators.required],

    })
    
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      this.familyId = params.get('familyId');
      this.babyId = params.get('babyId');  
      console.log(this.familyId);
      console.log(this.babyId);
  });
  this.form.valueChanges.subscribe(() => this.formIsValid = this.form.valid);
}

  submit(): void {
    if (this.formIsValid) {
      // see if we are on the create part
      if(this.babyId == null){
        this.babiesService.createOne$(this.familyId, this.form.value).pipe(take(1)).subscribe(() => {
          this.router.navigateByUrl(`app/families/${this.familyId}/babies`);
        });
      } else {
        this.babiesService.updateOne$(this.babyId, this.form.value).pipe(take(1)).subscribe((baby) => {
          this.router.navigateByUrl(`app/families/${this.familyId}/babies`);
        });
      }
    }
  }

}
