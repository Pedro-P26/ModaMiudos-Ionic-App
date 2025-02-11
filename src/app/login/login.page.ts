import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { CarrinhoService } from '../services/carrinho.service';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,ViewWillEnter{
  // Formulário de login com validação de campo
  loginForm: FormGroup;
  
  
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private alertController: AlertController,
    public carrinhoService: CarrinhoService
  ) {
    // Inicialização do FormGroup com validações para username e password
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\\d$@$!%*?&].{8,}')]]
    });
  }
  
  
  ngOnInit() {}

  // Método do ciclo de vida do Ionic que é chamado quando a vista está prestes a entrar em foco
  ionViewWillEnter(): void {
    // Bloqueia a orientação da tela para paisagem
    const options: OrientationLockOptions = {orientation : 'landscape'};
    ScreenOrientation.lock(options);
  }

  // Método para redirecionar para a página de registro
  public registar(){
    this.router.navigateByUrl('/registo');
  }

  // Método para processar a submissão do formulário de login
  async onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.userService.getUserByUsernameandPassword(username, password).subscribe(
        async (user: any) => {
          if (user) {
            // Criação de um alerta de sucesso se o login for bem-sucedido
            const alert = await this.alertController.create({
              header: 'Sucesso',
              message: 'Login realizado com sucesso!',
              buttons: ['OK']
            });
            await alert.present();
            // Redirecionar para a página de conta do usuário
            this.router.navigateByUrl('/conta');
          } else {
            // Criação de um alerta de erro se as credenciais forem inválidas
            const alert = await this.alertController.create({
              header: 'Erro',
              message: 'Usuário ou senha inválidos. Por favor, tente novamente.',
              buttons: ['OK']
            });
            await alert.present();
          }
        },
        async (error: any) => {
          // Criação de um alerta de erro em caso de falha na solicitação
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Ocorreu um erro ao realizar o login. Por favor, tente novamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    }
  }

  // Direcionar para paginas
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
