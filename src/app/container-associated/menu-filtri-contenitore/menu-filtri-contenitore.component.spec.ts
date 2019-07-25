import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFiltriContenitoreComponent } from './menu-filtri-contenitore.component';

describe('MenuFiltriContenitoreComponent', () => {
  let component: MenuFiltriContenitoreComponent;
  let fixture: ComponentFixture<MenuFiltriContenitoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFiltriContenitoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFiltriContenitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
