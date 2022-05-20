import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBabyComponent } from './create-baby.component';

describe('CreateBabyComponent', () => {
  let component: CreateBabyComponent;
  let fixture: ComponentFixture<CreateBabyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBabyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBabyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
