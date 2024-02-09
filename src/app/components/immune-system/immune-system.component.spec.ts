import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmuneSystemComponent } from './immune-system.component';

describe('ImmuneSystemComponent', () => {
  let component: ImmuneSystemComponent;
  let fixture: ComponentFixture<ImmuneSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmuneSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmuneSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
