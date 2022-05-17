import { Component, OnInit } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import { UserListItem } from '~modules/users/entities/user.list-item.entity';
import { UsersService } from '~modules/users/services/users.service';
import {first, map, switchMap, take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users$: ReplaySubject<UserListItem[]> = new ReplaySubject<UserListItem[]>(1);
  deleteSuccess = false;
  constructor(
    private titleService: Title,
    private readonly dialog: MatDialog,
    private readonly usersService: UsersService,
  ) {
    this.titleService.setTitle('Utilisateurs');
  }

  ngOnInit(): void {
    this.refreshCollection();
  }

  refreshCollection(): void {
    this.usersService
      .listAll$()
      .pipe(
        take(1),
        map(items => items),
      ).subscribe({
      next: (items) => this.users$.next(items)
    });
  }

  openDeleteDialog(target: UserListItem): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        htmlContent: `Voulez vous vraiment supprimer <strong>${target.lastName}&nbsp;${target.firstName}</strong>&nbsp;?`,
        icon: 'delete',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService
          .deleteOne$(target.id)
          .pipe(
            switchMap(() => this.users$),
            first(),
          )
          .subscribe({
            next: (items) => {
              const filteredItems = items.filter((i) => i.id !== target.id);
              this.users$.next(filteredItems);
              this.deleteSuccess = true;
              setTimeout(() => this.deleteSuccess = false , 3000 );
            }
          });
      }
    });
  }
}
