import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApoioPage } from './apoio.page';

describe('ApoioPage', () => {
  let component: ApoioPage;
  let fixture: ComponentFixture<ApoioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
