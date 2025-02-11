import { Component, OnInit } from '@angular/core';
import { Produto, CarrinhoService } from '../services/carrinho.service';
import { Router } from '@angular/router';
import { ReservasService } from '../services/reservas.service';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit, ViewWillEnter {
  // Array de produtos no carrinho
  carrinho!: Produto[];

  // Opções de tamanhos disponíveis para produtos
  tamanhos: string[] = ['XS', 'S', 'M', 'L', 'XL','30t','31t','32t','33t','34t','35t','36t','37t'];  // Definindo os tamanhos disponíveis  
  

  constructor(public carrinhoService: CarrinhoService,private router: Router,public reservasService: ReservasService,public alertController: AlertController,public toastController: ToastController) {}

  // Método chamado quando a página está prestes a entrar em foco
  ionViewWillEnter(): void {
    // Configura a orientação da tela para paisagem
    const options: OrientationLockOptions = {orientation : 'landscape'};
    ScreenOrientation.lock(options);
  }

  // Método do ciclo de vida do componente para inicialização
  ngOnInit() {
    // Subscrição para receber atualizações do carrinho de compras
    this.carrinhoService.carrinho$.subscribe(produtos => {
      this.carrinho = produtos;
    });
  }

  // Método para remover um produto do carrinho
  async removerDoCarrinho(produtoId: number) {
    // Criação de um alerta de confirmação
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover este produto do carrinho?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Remover',
          handler: () => {
            this.carrinhoService.removerDoCarrinho(produtoId);
            this.mostrarToast('Produto removido com sucesso.');
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para exibir uma mensagem rápida ao utilizador
  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  // Método para navegar para a página de reserva
  async navigateToReserva() {
    // Verifica se o carrinho está vazio
    if (this.carrinho.length === 0) {
      this.showAlert('Erro', 'Não é possível continuar, pois o carrinho está vazio.');
    } else {
      // Alerta para confirmar a ação de reserva
      const alert = await this.alertController.create({
        header: 'Confirmar Reserva',
        message: 'Deseja prosseguir para a loja da reserva?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Reserva cancelada');
            }
          },
          {
            text: 'Prosseguir',
            handler: () => {
              this.reservasService.saveProducts(this.carrinho);
              this.router.navigateByUrl('/lojareserva');
            }
          }
        ]
      });

      await alert.present();
    }
  }

  // Método genérico para mostrar um alerta
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Direcionar para outras páginas
  public login(){
    this.router.navigateByUrl('/login');
  }
  public carrinhoo(){
    this.router.navigateByUrl('/carrinho');
  }
  public home(){
    this.router.navigateByUrl('/home');
  }

}
