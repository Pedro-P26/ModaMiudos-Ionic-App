import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

// Definição de interface para Produto
interface Produto {
  id: string;
  title: string;
  preco: number;
  img: string;
  referencia: Int16Array;
  composicao: string;
  cor: string;
  tamanho: string;
  tamanho1?: string[];
}


// Definição de interface para um dicionário de produtos
interface Produtos {
  [key: string]: Produto;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter{

  // Propriedades para armazenar os dados dos produtos, produtos filtrados e a query de pesquisa
  public dataprodutos: Produtos;
  public filteredProducts: Produto[] = [];
  public searchQuery: string = '';
  constructor(private router: Router, public carrinhoService: CarrinhoService) {
    this.dataprodutos = {};// Inicializar os dados de produtos como um objeto vazio
  }

  // Método do ciclo de vida do Ionic que é chamado quando a página está prestes a entrar em foco
  ionViewWillEnter(): void {
    const options: OrientationLockOptions = {orientation : 'landscape'}; 
    ScreenOrientation.lock(options); // Bloqueia a orientação da tela para paisagem
  }


  // Método para carregar dados de produtos de um arquivo JSON local ao iniciar o componente
  ngOnInit() {
    fetch('./assets/data/produtos.json')
      .then(res => res.json())
      .then(json => {
        this.dataprodutos = json; // Armazena os dados JSON no dataprodutos
        this.filteredProducts = Object.values(this.dataprodutos); // Inicializa os produtos filtrados com todos os produtos
      });
  }

  
  // Métodos para navegar para as páginas de login, carrinho e home
  public login() {
    this.router.navigateByUrl('/login');
  }

  public carrinho() {
    this.router.navigateByUrl('/carrinho');
  }

  public home() {
    this.router.navigateByUrl('/home');
  }

  // Método para navegar para a página de detalhes do produto com parâmetros
  goToDetalhe(produto: Produto) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        produto: JSON.stringify(produto) // Passagem do produto como parâmetro via query
      }
    };
    this.router.navigate(['produtodetalhe'], navigationExtras);
  }

  // Método para filtrar produtos com base na query de pesquisa
  filterProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = Object.values(this.dataprodutos).filter(produto => 
      produto.title.toLowerCase().includes(query) || // Procurar por título
      produto.cor.toLowerCase().includes(query) || // Procurar por cor
      produto.referencia.toString().toLowerCase().includes(query) || // Procurar por referência
      produto.composicao.toLowerCase().includes(query) // Procurar por composição
    );
  }
}
