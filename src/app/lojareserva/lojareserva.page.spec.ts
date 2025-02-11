import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LojareservaPage } from './lojareserva.page';

describe('LojareservaPage', () => {
  let component: LojareservaPage;
  let fixture: ComponentFixture<LojareservaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LojareservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
