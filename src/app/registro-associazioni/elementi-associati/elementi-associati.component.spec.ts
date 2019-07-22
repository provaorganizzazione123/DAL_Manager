import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementiAssociatiComponent } from './elementi-associati.component';

describe('ElementiAssociatiComponent', () => {
  let component: ElementiAssociatiComponent;
  let fixture: ComponentFixture<ElementiAssociatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementiAssociatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementiAssociatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
