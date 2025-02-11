import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';



//Estrutura de dados do utilizador
export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  location: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Utilizador default tipo admin
  private users: User[] = [
    { id: 1, username:'username' ,password: 'pedro@gmail.com', name: 'nome', location:'localidade',email:'email'}
  ];


  constructor() { }


  // Método para retornar todos os usuários como um Observable
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

   // Método para adicionar um novo utilizador ao array de utilizadores e retornar esse utilizador como um Observable
  addUser(username: string, password: string, name: string, location: string, email: string): Observable<User> {
    const newUser: User = {
      id: this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1, //Gera um novo id para o utilizador
      username,
      password,
      name,
      location,
      email,
    };
    this.users.push(newUser); // Adiciona o novo utilizador ao array
    return of(newUser);// Retorna o novo utilizador como um Observable
  }

  // Método para buscar um utilizador pelo nome de usuário e senha, retornando como Observable
  getUserByUsernameandPassword(username: string,password: string): Observable<User | null>{
    return of(this.users.find(user => user.username === username && user.password === password) || null).pipe(catchError(() => of(null)));
  }

  // Método para atualizar o email de um utilizador existente, retornando o utializador atualizado ou null se não encontrado
  atualizarEmail(emailAntigo: string, emailNovo: string): Observable<User | null> {
    const user = this.users.find(user => user.email === emailAntigo);
    if (user) {
      user.email = emailNovo; //Atualizar o email novo
      return of(user);
    } else {
      return of(null);
    }
  }




}
