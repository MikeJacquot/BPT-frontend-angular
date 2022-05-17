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
