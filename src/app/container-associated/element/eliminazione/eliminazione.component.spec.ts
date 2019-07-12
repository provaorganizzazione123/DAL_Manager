import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminazioneComponent } from './eliminazione.component';

describe('EliminazioneComponent', () => {
  let component: EliminazioneComponent;
  let fixture: ComponentFixture<EliminazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
