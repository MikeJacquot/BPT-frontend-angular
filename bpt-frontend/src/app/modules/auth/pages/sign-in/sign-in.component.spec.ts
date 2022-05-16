import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorsManagementModule } from 'src/app/modules/errors-management/errors-management.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ErrorsManagementModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
      ],
      providers: [AuthenticationService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
