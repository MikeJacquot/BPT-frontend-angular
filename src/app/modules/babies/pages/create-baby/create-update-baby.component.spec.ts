import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBabyComponent } from './create-update-baby.component';

describe('CreateUpdateBabyComponent', () => {
  let component: CreateUpdateBabyComponent;
  let fixture: ComponentFixture<CreateUpdateBabyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateBabyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateBabyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
