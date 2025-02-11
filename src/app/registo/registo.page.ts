import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage implements OnInit,ViewWillEnter {

  // Declaração do FormGroup para gerenciar o formulário de registro
  registerForm: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private userService: UserService, private alertController: AlertController,public carrinhoService: CarrinhoService) {
     // Inicialização do FormGroup com validações específicas para cada campo
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\\d$@$!%*?&].{8,}')]], // Inclui uma regex para senha forte
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  ngOnInit() {}

  // Método para trancar a orientação da tela para paisagem quando a vista está prestes a entrar
  ionViewWillEnter(): void {
    const options: OrientationLockOptions = {orientation : 'landscape'};
    ScreenOrientation.lock(options);
  }

  // Método onSubmit que é chamado quando o formulário é submetido
  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password, name , location, email } = this.registerForm.value;
      this.userService.addUser(username, password, name, location, email).subscribe(
        async response => {
          // Criando e apresentando um alerta de sucesso
          const alert = await this.alertController.create({
            header: 'Sucesso',
            message: 'Registro realizado com sucesso!',
            buttons: ['OK']
          });
          await alert.present();
          // Redirecionamento para a página de login após o registro
          this.router.navigateByUrl('/login');
        },
        async error => {
          // Criando e apresentando um alerta de erro
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Ocorreu um erro ao registrar. Por favor, tente novamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    }
  }

  // Métodos de navegação para login, carrinho e home
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
