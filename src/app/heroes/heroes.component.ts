import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

// @Component é um decorador que especifica metadados Angular no componente
@Component({
  selector: 'app-heroes', // seletor que representará uma tag no HTML
  templateUrl: './heroes.component.html', // localizanção do arquivo de modelo do componente
  styleUrls: ['./heroes.component.css'] // localização do CSS privados do componente
})
export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService
  ) { }

  heroes: Hero[];

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes); // atribui ao heroes o array de heroes obtido pelo serviço
    // subscribe é equivalente ao .then - assim que a requisição assincrona for retonrnada, ela irá
    // para o parâmetro
  }

  add(name: String) {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnInit() {
    this.getHeroes();
  }

}
