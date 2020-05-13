import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({ //specifies the Angular metadata for the component
  selector: 'app-heroes', //the component's css element selector
  templateUrl: './heroes.component.html', //the location of the component's template file
  styleUrls: ['./heroes.component.css'] //location of component's private CSS styles
})
export class HeroesComponent implements OnInit {

  heroes : Hero[]; //this is for the display

  //defines a private heroService property and identifies it as a HeroService injection site
  constructor(private heroService:HeroService, private messageService: MessageService) { }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero); //pushes to the display
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
      this.getHeroes(); //good practice to put this here instead of the constructor
  }

}
