import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBookLineFormComponent } from './cash-book-line-form.component';

describe('CashBookLineFormComponent', () => {
  let component: CashBookLineFormComponent;
  let fixture: ComponentFixture<CashBookLineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashBookLineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBookLineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
