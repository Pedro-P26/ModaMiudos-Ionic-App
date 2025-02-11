import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-apoio',
  templateUrl: './apoio.page.html',
  styleUrls: ['./apoio.page.scss'],
})
export class ApoioPage implements OnInit {

  constructor(private router: Router, public carrinhoService: CarrinhoService) { }

  ngOnInit() {
  }

  //Direcionar para a pagina login
  public login() {
    this.router.navigateByUrl('/login');
  }

  //Direcionar para a pagina carrinho
  public carrinho() {
    this.router.navigateByUrl('/carrinho');
  }

  //Direcionar para a pagina home
  public home() {
    this.router.navigateByUrl('/home');
  }

}
