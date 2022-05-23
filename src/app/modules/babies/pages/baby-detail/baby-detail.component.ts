import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, take } from 'rxjs';
import { Baby } from '~modules/babies/modules/entities/baby.entity';
import { BabiesService } from '~modules/babies/modules/services/babies.services';
import { BiometricsService } from '~modules/biometrics/modules/biometrics.service';
import { CreateBiometricDTO } from '~modules/biometrics/modules/dto/create-biometric.dto';
import { Biometric } from '~modules/biometrics/modules/entities/biometric.entity';

@Component({
  selector: 'app-baby-detail',
  templateUrl: './baby-detail.component.html',
  styleUrls: ['./baby-detail.component.scss']
})
export class BabyDetailComponent implements OnInit {

  baby$ = new ReplaySubject<Baby>(1);
  biometrics$ = new ReplaySubject<Biometric[]>(1);
  currentBiometrics;
  babyId: string;
  form: FormGroup;
  showForm: boolean = false;

  constructor(
    private readonly babiesService: BabiesService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly biometricsService: BiometricsService,
  ) { }

  ngOnInit(): void {
    this.babyId = this.route.snapshot.params.babyId;
    console.log(this.babyId);
    this.babiesService.getOne$(this.babyId).pipe(take(1)).subscribe((baby) => {
      this.baby$.next(baby);
    })
    this.biometricsService.listAllByBaby$(this.babyId).pipe(take(1)).subscribe((biometrics) => {
      this.biometrics$.next(biometrics);
      this.currentBiometrics = biometrics;
    });
  }


  getAge(babyBirthDate: Date): string {
    babyBirthDate = new Date(babyBirthDate);
    let currentDate = new Date();
    let day = babyBirthDate.getDate();
    let month = babyBirthDate.getMonth();
    let year = babyBirthDate.getFullYear();

    if (currentDate.getDate() <= day) {
      return `${currentDate.getFullYear() - year} ans et ${currentDate.getMonth() - month -1 } mois`
    } else {
      return `${currentDate.getFullYear() - year} ans et ${currentDate.getMonth() - month } mois`
    }
  }

  // initiate and display form
  displayForm() {
    this.form = this.fb.group({
      height: [null, Validators.required],
      weight: [null, Validators.required],
      date: [new Date(), Validators.required],
    });
    this.showForm = true;
  }

  submit(babyId: string) {
    if(this.form.valid){
      this.biometricsService.create$(babyId, this.form.value).pipe(take(1)).subscribe((bio) => {
        this.showForm = false;
        this.biometrics$.next([bio, ...this.currentBiometrics]);
      });
    }
  }

  }
