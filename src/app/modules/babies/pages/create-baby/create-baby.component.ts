import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private readonly fb: FormBuilder,
    private readonly babiesService: BabiesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
      // TODO I WAS HERE
    })
  }

  submit(): void {

  }

}
