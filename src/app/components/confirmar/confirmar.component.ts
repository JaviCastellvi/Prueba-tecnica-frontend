import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from 'src/app/interfaces/heroes.model';


@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<ConfirmarComponent>,  
             @Inject(MAT_DIALOG_DATA) public data: Heroe) { }

  ngOnInit(): void {
    console.log (this.data)
  }

  borrar(){
    this.matDialogRef.close(true);
  }

  cancelar(){
    this.matDialogRef.close();
  }

}
