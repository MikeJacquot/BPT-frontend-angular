import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TagModule } from 'src/app/components/tag/tag.module';
import { UserRole } from '~modules/users/entities/user-role.enum';
import { UsersService } from '~modules/users/services/users.service';

import { ListUsersComponent } from './list-users.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TagModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule
      ],
      declarations: [ ListUsersComponent ],
      providers: [
        {
          provide: UsersService,
          useValue: {
            listAll$: () => of([
              {
                userName: 'cedric',
                firstName: 'CedricFirstname',
                lastName: 'CedricLastname',
                role: UserRole.NotGranted,
              }, {
                userName: 'martine',
                firstName: 'MartineFirstname',
                lastName: 'MartineLastname',
                role: UserRole.Planner,
              }, {
                userName: 'pierre',
                firstName: 'PierreFirstname',
                lastName: 'PierreLastname',
                role: UserRole.Technician,
              }
            ])
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3 users', () => {
    const usersItems = fixture. debugElement.queryAll(By.css('.users-item'));
    expect(usersItems.length).toEqual(3);
  });
});
