import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Heroe } from 'src/app/interfaces/heroes.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = this.loaderService.isLoading$;

  heroes: Heroe[] = [];
  heroes_copy: Heroe[] = [];

  pageIndex!:number;
  pageSize!:number;
  lowValue!:number;
  highValue!:number;  

  constructor(
    private loaderService: LoaderService,
    private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getHeroes();
    
  }

  getHeroes(){

    this.pageIndex = 0;
    this.pageSize = 6;
    this.lowValue = 0;
    this.highValue = 6;  
  
    this.heroesService.getHeroes().subscribe((heroes: Heroe[])=>{
      this.heroes = heroes;
      this.heroes_copy = this.heroes;
    })
  }

  filter(e: any){
 
    const search = e.target.value;

    this.heroes= this.heroes_copy.filter(({superhero}: Heroe)=> superhero.toLowerCase().includes(search.toLowerCase()))

    this.pageSize = 6;
    this.lowValue = 0;

    if (this.heroes.length<6){
      this.pageIndex = 0;
    }
   
  }

  getPaginatorData(event: any){

    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }   
      this.pageIndex = event.pageIndex;
  }

}
