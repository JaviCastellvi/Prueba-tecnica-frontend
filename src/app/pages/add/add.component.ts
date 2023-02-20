import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { Heroe } from '../../interfaces/heroes.model';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = this.loaderService.isLoading$;

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: '',
    alt_img: ''
  }

  constructor(
    private loaderService: LoaderService,
    private heroesService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit')){
        return;
    }
    
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.heroesService.getHeroePorId(id))
      )
      .subscribe((heroe)=>this.heroe= heroe);
  }

  save(){

    if (this.heroe.superhero.trim().length === 0){
      return;
    }

    if (this.heroe.id){
        //Actualizar
        this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( () => {
          this.router.navigate(['/list']);
        })
    } else {
      // Crear
      const heroe: Heroe = Object.assign({}, this.heroe);
      if (!heroe.alt_img) heroe.alt_img = 'assets/no-image.png'
      this.heroesService.agregarHeroe(heroe)
      .subscribe(()=>{
        this.router.navigate(['/list']);
      })
    }

  }

  remove(){

    this.heroesService.borrarHeroe(this.heroe.id!)
    .subscribe(()=>{
      this.router.navigate(['/list']);
    })
  }
}
