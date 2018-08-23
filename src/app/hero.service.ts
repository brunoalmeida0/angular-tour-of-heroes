import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { runInThisContext } from 'vm';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Classe Service que obtém os dados do banco de dados (ou do modelo, como é o caso) e faz a ligação
// com os componentes que irão utiliza-las
export class HeroService {

  private heroesUrl = 'api/heroes'; // url para a web api

  constructor(
    private messageService: MessageService, // service in service
    private http: HttpClient
  ) { }

  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // Observable funciona para simplificar funções assincronas, ele literalmente ficará observando e
  // Aguardando a resposta.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) // http.get retorna um observable
      .pipe(
        tap(heroes => this.log('fetched heroes')), // apresenta a mensagem
        catchError(this.handlerError('getHeroes', [])) // catchError intercepta um erro no Observable
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url) // retorna um Observable<Hero[]>
      .pipe(
        tap(_ => this.log(`fetched hero id: ${id}`)),
        catchError(this.handlerError<Hero>(`getHero id: ${id}`))
      );
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id: ${hero.id}`)),
      catchError(this.handlerError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((hero: Hero) => this.log(`added hero w/ id: ${hero.id}`)),
      catchError(this.handlerError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handlerError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handlerError<Hero[]>('searchHeroes', []))
    );
  }
}
