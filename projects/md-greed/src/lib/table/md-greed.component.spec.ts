import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdGreedComponent } from './md-greed.component';

describe('MdGreedComponent', () => {
  let component: MdGreedComponent;
  let fixture: ComponentFixture<MdGreedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdGreedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdGreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
