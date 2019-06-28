import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAssociazioniComponent } from './registro-associazioni.component';

describe('RegistroAssociazioniComponent', () => {
  let component: RegistroAssociazioniComponent;
  let fixture: ComponentFixture<RegistroAssociazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAssociazioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAssociazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
