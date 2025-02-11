import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit,ViewWillEnter {
 

  constructor(private router: Router,public carrinhoService: CarrinhoService) { }

  ngOnInit() {
  }

  // Método do ciclo de vida Ionic que é chamado quando a página está prestes a ser exibida
  ionViewWillEnter(): void {
    const options: OrientationLockOptions = {orientation : 'landscape'};
    ScreenOrientation.lock(options); // Bloqueia a orientação da tela para 'landscape'
  }


  //Direcionar para paginas
  apoio(){
    this.router.navigateByUrl('/apoio');
  }

  minhasreservas(){
    this.router.navigateByUrl('/reservas');
  }
  alterardados(){
    this.router.navigateByUrl('/alterdados');
  }
  terminarSessao() {
    this.router.navigateByUrl('/home');
  }

  public login(){
    this.router.navigateByUrl('/login');
  }

  public carrinho(){
    this.router.navigateByUrl('/carrinho');
  }
  public home(){
    this.router.navigateByUrl('/home');
  }

}
