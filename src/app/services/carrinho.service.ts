import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


//Estrutura de dados de cada produto
export interface Produto {
  id: number;
  title: string;
  preco: number;
  cor: string;
  tamanho: string;
  referencia: string;
  composicao: string;
  img: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  // BehaviorSubject para manter o estado atual do carrinho de compras. Inicializa como um array vazio.
  private carrinho = new BehaviorSubject<Produto[]>([]);

   // Observable público para expor as mudanças do carrinho aos componentes que assinarem este Observable.
  carrinho$ = this.carrinho.asObservable();

  constructor() {}

  // Método para adicionar um produto ao carrinho
  adicionarAoCarrinho(produto: Produto) {
    const carrinhoAtual = this.carrinho.value; // Obtém o valor atual do carrinho
    const produtoExistente = carrinhoAtual.find(p => p.id === produto.id); // Verifica se o produto já existe no carrinho

    if (!produtoExistente) {
      produto.quantidade--; // Diminui a quantidade do produto 
      this.carrinho.next([...carrinhoAtual, produto]); // Atualiza o carrinho adicionando o novo produto
    }
    // Se o produto já existe, o código não faz nada 
  }

  // Método para remover um produto do carrinho
  removerDoCarrinho(produtoId: number) {
    const carrinhoAtual = this.carrinho.value.filter(prod => prod.id !== produtoId); // Filtra o carrinho removendo o produto pelo ID
    this.carrinho.next(carrinhoAtual); // Atualiza o carrinho com o novo array de produtos
  }



}
