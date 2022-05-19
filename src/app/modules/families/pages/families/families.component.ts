import { Component, OnInit } from '@angular/core';
import { ReplaySubject, take } from 'rxjs';
import { Family, FamilyRelationshipType } from '~modules/families/modules/entities/family.entity';
import { FamiliesService } from '~modules/families/modules/families.service';
import { UsersService } from '~modules/users/module/users/services/users.service';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})
export class FamiliesComponent implements OnInit {

  families$ = new ReplaySubject<Family[]>(1)
  currentUserId: string;

  constructor(
    private readonly familiesService: FamiliesService,
    private readonly usersService: UsersService
    ) { }


  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('currentUserEmail');
    this.usersService.getOneByEmail$(userEmail).pipe(take(1)).subscribe((user) => {
      this.currentUserId = user.id;
      this.familiesService.listAllByUser$(this.currentUserId).subscribe((families) => {
        this.families$.next(families);
      })
    })
   
  }

  deleteFamily(id: string) {
    // add Success panel later and also confirmation dialog
    this.familiesService.deleteOne$(id).pipe(take(1)).subscribe(() =>
      this.familiesService.listAllByUser$(this.currentUserId).subscribe((families) => {
        this.families$.next(families);
      })
    );
  }

  relationValueToText(input: FamilyRelationshipType) : string{
    switch(input) {
      case 'parent' : return 'Parent';
      case 'godparent': return 'Parrain/Marraine';
      case 'grandparent': return 'Grand-parent';
      case 'uncle / aunt': return 'Oncle/Tante';
      case 'other': return 'Autre';
    }
  }


}

