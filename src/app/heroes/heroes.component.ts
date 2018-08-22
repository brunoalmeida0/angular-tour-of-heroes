import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

// @Component é um decorador que especifica metadados Angular no componente
@Component({
  selector: 'app-heroes', // seletor que representará uma tag no HTML
  templateUrl: './heroes.component.html', // localizanção do arquivo de modelo do componente
  styleUrls: ['./heroes.component.css'] // localização do CSS privados do componente
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit() {
  }

}
