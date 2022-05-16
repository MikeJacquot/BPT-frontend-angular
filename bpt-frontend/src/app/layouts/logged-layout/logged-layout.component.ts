import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/auth/entities/user.entity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
  animations: [
    trigger('searchInputFocus', [
      state('searchInputFocused', style({
        width: '250px',
      })),
      transition('* => searchInputFocused', [
        animate('0.3s ease-in-out'),

      ]),
      transition('searchInputFocused => *', [
        animate('0.2s ease-in-out')
      ])
    ])
  ]
})
export class LoggedLayoutComponent implements OnInit {

  user$: Observable<User>;
  currentApplicationVersion: string = environment.appVersion;
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
