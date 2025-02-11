import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-produtodetalhe',
  templateUrl: './produtodetalhe.page.html',
  styleUrls: ['./produtodetalhe.page.scss'],
})
export class ProdutodetalhePage implements OnInit,ViewWillEnter{
   // Propriedade para armazenar os detalhes do produto
  public produto: any;


  constructor(
    private route: ActivatedRoute,public carrinhoService: CarrinhoService,
    private alertController: AlertController,private toastController: ToastController,private router:Router) {
    // Subscrição aos parâmetros da rota para obter detalhes do produto 
    this.route.queryParams.subscribe(params => {
      if (params && params['produto']) {
        // Se há parâmetros e o parâmetro 'produto' existe, parse o produto do JSON
        this.produto = JSON.parse(params['produto']);
      }
    });
   }

  ngOnInit() {
  }

  // Método para trancar a orientação da tela para paisagem quando a vista entra em foco
  ionViewWillEnter(): void {
    const options: OrientationLockOptions = {orientation : 'landscape'};
    ScreenOrientation.lock(options);
  }

  // Método para adicionar o produto ao carrinho com confirmação via alerta
  async adicionarAoCarrinho() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deseja adicionar este produto ao cesto?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'botao-nao',
          handler: () => {
          
          }
        },
        {
          text: 'Sim',
          cssClass: 'botao-sim',
          handler: () => {
            this.carrinhoService.adicionarAoCarrinho(this.produto); // Adiciona o produto ao carrinho
            this.mostrarToast('Produto adicionado ao carrinho.'); // Mostra um toast de confirmação
          }
        }
      ]
    });
    await alert.present(); // Mostra o alerta
  }

  // Método para exibir um toast com mensagem customizada
  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom' // Define a posição do toast para a parte inferior da tela
    });
    toast.present(); // Exibe o toast
  }

  // Métodos para navegação entre as páginas 
  public login() {
    this.router.navigateByUrl('/login'); 
  }

  public carrinho() {
    this.router.navigateByUrl('/carrinho'); 
  }

  public home() {
    this.router.navigateByUrl('/home'); 
  }
}
