import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserimentoContenitoreComponent } from './inserimento-contenitore.component';

describe('InserimentoContenitoreComponent', () => {
  let component: InserimentoContenitoreComponent;
  let fixture: ComponentFixture<InserimentoContenitoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserimentoContenitoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserimentoContenitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
