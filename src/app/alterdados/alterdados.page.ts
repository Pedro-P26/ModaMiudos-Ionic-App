import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-alterdados',
  templateUrl: './alterdados.page.html',
  styleUrls: ['./alterdados.page.scss'],
})
export class AlterdadosPage implements OnInit, ViewWillEnter{

   // Declaração do FormGroup para gerenciar o formulário de alteração de dados
   alterarDadosForm: FormGroup;

   // Construtor com as dependências necessárias
   constructor(
     private router: Router,
     private formBuilder: FormBuilder,
     private userService: UserService,
     private alertController: AlertController,
     public carrinhoService: CarrinhoService 
   ) {
     // Inicialização do formulário com validações de campos de email
     this.alterarDadosForm = this.formBuilder.group({
       emailAntigo: ['', [Validators.required, Validators.email]],
       emailNovo: ['', [Validators.required, Validators.email]]
     });
   }
 
   
   ngOnInit() {}
 
   // Método do ciclo de vida Ionic que é chamado quando a página está prestes a ser exibida
   ionViewWillEnter(): void {
     const options: OrientationLockOptions = {orientation : 'landscape'};
     ScreenOrientation.lock(options); // Bloqueia a orientação da tela para 'landscape'
   }
 
   // Método chamado ao enviar o formulário
   async onSubmit() {
     if (this.alterarDadosForm.valid) { // Verifica se o formulário é válido
       const { emailAntigo, emailNovo } = this.alterarDadosForm.value;
       this.userService.atualizarEmail(emailAntigo, emailNovo).subscribe(
         async user => {
           if (user) {
             // Cria um alerta de sucesso se o email for atualizado
             const alert = await this.alertController.create({
               header: 'Sucesso',
               message: 'Email atualizado com sucesso!',
               buttons: [{
                text: 'OK',
                handler: () => {
                  this.router.navigateByUrl('/conta'); // Redireciona para a página de conta
                }
              }]
             });
             await alert.present();
           } else {
             // Cria um alerta de erro se o email antigo não for encontrado
             const alert = await this.alertController.create({
               header: 'Erro',
               message: 'Email antigo não encontrado.',
               buttons: ['OK']
             });
             await alert.present();
           }
         },
         async error => {
           // Cria um alerta de erro se ocorrer um problema na requisição
           const alert = await this.alertController.create({
             header: 'Erro',
             message: 'Ocorreu um erro ao atualizar o email. Por favor, tente novamente.',
             buttons: ['OK']
           });
           await alert.present();
         }
       );
     }
   }
 
   // Direciona para a página de login
   public login(){
     this.router.navigateByUrl('/login');
   }
 
   // Direciona para a página do carrinho de compras
   public carrinho(){
     this.router.navigateByUrl('/carrinho');
   }
 
   // Direciona para a página inicial
   public home(){
     this.router.navigateByUrl('/home');
   }
}
