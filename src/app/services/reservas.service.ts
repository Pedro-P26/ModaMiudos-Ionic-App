import { Injectable } from '@angular/core';
import { Produto } from './carrinho.service';
import { BehaviorSubject } from 'rxjs';


//Interface para a loja
interface Store {
  name: string;
  address: string;
  hours: string;
}

// Definição de interface para a reserva
export interface Reservation {
  products: Produto[];
  store?: Store;  // Make store optional
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {


    // BehaviorSubject que armazena um array de reservas, inicializado como vazio
    private reservasSource = new BehaviorSubject<Reservation[]>([]);

    // Observable público que expõe o BehaviorSubject de reservas para assinatura por outros componentes
    reservas$ = this.reservasSource.asObservable();
  
    constructor() { }
  
    // Método para adicionar uma nova reserva contendo apenas produtos ao array de reservas
    saveProducts(products: Produto[]) {
      const reservations = this.reservasSource.value; // Pega o valor atual das reservas
      reservations.push({ products }); // Adiciona uma nova reserva com os produtos fornecidos
      this.reservasSource.next(reservations); // Atualiza o BehaviorSubject com as novas reservas
    }

    // Método para adicionar uma loja à última reserva criada
    addStoreToReservation(store: Store) {
      const reservations = this.reservasSource.value; // Pega o valor atual das reservas
      if (reservations.length > 0) { // Verifica se há reservas
        reservations[reservations.length - 1].store = store; // Adiciona a loja à última reserva
        this.reservasSource.next(reservations); // Atualiza o BehaviorSubject com as reservas modificadas
      }
    }
    
    // Método para limpar (remover todas) as reservas
    clearReservations() {
      this.reservasSource.next([]); // Define o valor das reservas para um array vazio
    }

  
}
