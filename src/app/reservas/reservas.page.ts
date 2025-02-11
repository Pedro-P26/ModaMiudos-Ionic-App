import { Component, OnInit } from '@angular/core';
import { ReservasService, Reservation } from '../services/reservas.service';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

     // Array para armazenar as reservas obtidas do serviço de reservas
    reservas: Reservation[] = [];


    constructor(public reservasService: ReservasService, private router:Router,public carrinhoService: CarrinhoService) { }
  
    // Método ngOnInit do ciclo de vida do componente para inicializar dados
  ngOnInit() {
    // Subscrição ao Observable de reservas do serviço de reservas
    // Atualiza a lista de reservas sempre que há mudanças
    this.reservasService.reservas$.subscribe(reservas => {
      this.reservas = reservas;
    });
  }

  // Método para navegar para a página de login
  public login() {
    this.router.navigateByUrl('/login');
  }

  // Método para navegar para a página do carrinho de compras
  public carrinho() {
    this.router.navigateByUrl('/carrinho');
  }

  // Método para navegar para a página inicial
  public home() {
    this.router.navigateByUrl('/home');
  }

}
