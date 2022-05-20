import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, take } from 'rxjs';
import { Baby } from '~modules/babies/modules/entities/baby.entity';
import { BabiesService } from '~modules/babies/modules/services/babies.services';



@Component({
  selector: 'app-babies-interventions',
  templateUrl: './list-babies.component.html',
  styleUrls: ['./list-babies.component.scss']
})
export class ListBabiesComponent implements OnInit {

  familyId: string
  babies$ = new ReplaySubject<Baby[]>(1);
  testDate = new Date();

  constructor(
    private readonly titleService: Title,
    private readonly babyService: BabiesService,
    private readonly route: ActivatedRoute,
  ) {
    this.titleService.setTitle('bébés');

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe( params => {
      this.familyId = params.get('familyId'); 
  });
    this.babyService.listAllByFamily$(this.familyId).subscribe((babies) => {
      this.babies$.next(babies);
    });
  }

  // really it seems not legal ... but we have to do this
  deleteBaby(id: string) {
    // add Success panel later and also confirmation dialog
    this.babyService.deleteOne$(id).pipe(take(1)).subscribe(() =>
      this.babyService.listAllByFamily$(this.familyId).subscribe((babies) => {
        this.babies$.next(babies);
      })
    );
  }




 



}
