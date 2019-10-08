import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsTempComponent } from './inputs-temp.component';

describe('InputsTempComponent', () => {
  let component: InputsTempComponent;
  let fixture: ComponentFixture<InputsTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputsTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
