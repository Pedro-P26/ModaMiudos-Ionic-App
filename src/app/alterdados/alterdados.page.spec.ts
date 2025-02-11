import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlterdadosPage } from './alterdados.page';

describe('AlterdadosPage', () => {
  let component: AlterdadosPage;
  let fixture: ComponentFixture<AlterdadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterdadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
