import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marcador } from '../../clases/marcador.class';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  forma: FormGroup;

  constructor( public fb: FormBuilder, public dialogRef: MatDialogRef<MapaEditarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Marcador ) {
    this.forma = fb.group({
      titulo: data.titulo,
      desc: data.desc
    });
  }

  ngOnInit(): void {
  }

  guardarCambios(): void {
    this.dialogRef.close( this.forma.value );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
