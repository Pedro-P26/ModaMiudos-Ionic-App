import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutodetalhePage } from './produtodetalhe.page';

describe('ProdutodetalhePage', () => {
  let component: ProdutodetalhePage;
  let fixture: ComponentFixture<ProdutodetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutodetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
