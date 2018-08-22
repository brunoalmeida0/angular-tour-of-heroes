import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

// Classe Service que obtém os dados do banco de dados (ou do modelo, como é o caso) e faz a ligação
// com os componentes que irão utiliza-las
export class HeroService {

  constructor(private messageService: MessageService) { } // service in service

  // Observable funciona para simplificar funções assincronas, ele literalmente ficará observando e
  // Aguardando a resposta.
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES); // retorna um Observable<Hero[]>
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetched hero id=${id}');
    return of(HEROES.find(hero => hero.id === id)); // retorna um Observable<Hero[]>
  }
}
