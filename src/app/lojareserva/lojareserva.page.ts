import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { CarrinhoService } from '../services/carrinho.service';
import { ReservasService } from '../services/reservas.service';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-lojareserva',
  templateUrl: './lojareserva.page.html',
  styleUrls: ['./lojareserva.page.scss'],
})
export class LojareservaPage implements OnInit,ViewWillEnter {
 // Armazena a loja selecionada atualmente
  selectedStore: any; 

  // Lista de lojas disponíveis para reserva
  lojas = [
    { name: 'Loja Centro', address: 'Rua das Flores, 123', hours: '09:00 - 20:00' },
    { name: 'Loja Norte', address: 'Avenida da Liberdade, 456', hours: '10:00 - 21:00' },
    { name: 'Loja Sul', address: 'Travessa dos Pescadores, 789', hours: '09:30 - 19:30' },
    { name: 'Loja Leste', address: 'Praça do Comércio, 101', hours: '10:00 - 22:00' },
    { name: 'Loja Oeste', address: 'Rua da Esperança, 202', hours: '08:00 - 18:00' },
];

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router,
    public reservasService: ReservasService,
    public carrinhoService: CarrinhoService,
    public alertController: AlertController
  ) {}
  ngOnInit(){}


  // Bloqueia a orientação da tela para paisagem quando a página entra em foco
  ionViewWillEnter(): void {
    const options: OrientationLockOptions = {orientation : 'landscape'};
    ScreenOrientation.lock(options);
  }

 // Método para confirmar a reserva na loja selecionada
 async confirmReservation() {
  if (this.selectedStore) {
    const alert = await this.alertController.create({
      header: 'Confirmar Reserva',
      message: 'Você deseja confirmar a reserva nesta loja?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Reserva cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.reservasService.addStoreToReservation(this.selectedStore); // Adiciona a loja à reserva
            this.showSuccessToast(); // Exibe um toast de sucesso
          }
        }
      ]
    });
    await alert.present(); // Exibe o alerta
  } else {
    this.showSelectionErrorToast(); // Exibe um toast de erro se nenhuma loja for selecionada
  }
}

// Exibe um toast de sucesso após a reserva
async showSuccessToast() {
  const toast = await this.toastController.create({
    message: 'Reserva efetuada com sucesso, verifique o seu email para mais informação.',
    duration: 2000,
    position: 'top'
  });
  toast.present();
  toast.onDidDismiss().then(() => {
    this.router.navigateByUrl('/home'); // Navega para a página inicial após o toast
  });
}

// Exibe um toast de erro se nenhuma loja for selecionada
async showSelectionErrorToast() {
  const toast = await this.toastController.create({
    message: 'Por favor, selecione uma loja antes de confirmar.',
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

// Métodos de navegação rápida para as páginas de login, carrinho, e home
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
