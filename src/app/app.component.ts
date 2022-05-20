import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ErrorSnackbarComponent } from '~modules/errors-management/components/error-snackbar.component';
import { SessionErrorsManager } from '~modules/errors-management/services/session-errors-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bpt-frontend';

  errorsSubscription: Subscription;

  constructor(
      private readonly snackBar: MatSnackBar,
      private readonly sessionErrorsManager: SessionErrorsManager
  ) {}

  ngOnInit(): void {
     this.errorsSubscription = this.sessionErrorsManager
          .get$()
          .subscribe( (error) => {
              this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                  data: error,
              });
          });
  }

  ngOnDestroy(): void {
      this.errorsSubscription.unsubscribe();
  }
}
