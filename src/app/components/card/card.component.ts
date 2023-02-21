import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Heroe } from 'src/app/interfaces/heroes.model';
import { HeroesService } from '../../services/heroes/heroes.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ConfirmarComponent } from '../confirmar/confirmar.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() heroe!: Heroe;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  isLoading$: BehaviorSubject<boolean> = this.loaderService.isLoading$;
  
  constructor(
        private loaderService: LoaderService,
        private heroesService: HeroesService,
        private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  remove(){

    const dialog= this.matDialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(result=> {
      
      if (result){
        this.heroesService.borrarHeroe(this.heroe.id!)
        .subscribe(()=>{
          this.refreshList.emit()
        })
      }
    })

   
  }

}
