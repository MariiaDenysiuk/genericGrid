import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreedComponent } from './greed.component';

describe('GreedComponent', () => {
  let component: GreedComponent;
  let fixture: ComponentFixture<GreedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
