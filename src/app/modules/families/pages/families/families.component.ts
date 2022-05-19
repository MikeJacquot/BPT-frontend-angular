import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Family } from '~modules/families/modules/entities/family.entity';
import { FamiliesService } from '~modules/families/modules/families.service';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})
export class FamiliesComponent implements OnInit {

  families$: Observable<Family[]>
  constructor(private readonly familiesService: FamiliesService) { }


  ngOnInit(): void {
    this.families$ = this.familiesService.listAll$();
  }
}

