import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAssociatedComponent } from './container-associated.component';

describe('ContainerAssociatedComponent', () => {
  let component: ContainerAssociatedComponent;
  let fixture: ComponentFixture<ContainerAssociatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerAssociatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerAssociatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
