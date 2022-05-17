import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordComponent } from './update-password.component';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { ErrorsManagementModule } from 'src/app/modules/errors-management/errors-management.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePasswordComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ErrorsManagementModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
      ],
      providers: [ AuthenticationService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
