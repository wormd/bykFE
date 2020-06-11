import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CashBookPageComponent} from './cash-book.component';

describe('CashbookComponent', () => {
  let component: CashBookPageComponent;
  let fixture: ComponentFixture<CashBookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashBookPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
