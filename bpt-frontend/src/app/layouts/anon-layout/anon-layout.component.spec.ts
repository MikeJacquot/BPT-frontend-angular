import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonLayoutComponent } from './anon-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('AnonLayoutComponent', () => {
  let component: AnonLayoutComponent;
  let fixture: ComponentFixture<AnonLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonLayoutComponent ],
      imports: [

        RouterTestingModule,
        BrowserAnimationsModule,

        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
