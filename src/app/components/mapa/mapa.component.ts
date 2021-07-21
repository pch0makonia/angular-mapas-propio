import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Marcador } from '../../clases/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  marcadorShow: Marcador = new Marcador();
  marcadores: Marcador[] = [];
  center: google.maps.LatLngLiteral = {lat: -33.582584800480504, lng: -70.6639360568764};
  zoom = 12;

  constructor( public snackBar: MatSnackBar, public dialog: MatDialog ) {
    if ( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse( localStorage.getItem('marcadores') );
    }
  }

  ngOnInit(): void {
  }


  addMarker(event: google.maps.MapMouseEvent): void {
    const coords: { lat: number, lng: number } = event.latLng.toJSON();
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push( nuevoMarcador );
    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'cerrar', {duration: 3000 });
  }

  openInfoWindow( marker: MapMarker, marcador ): void {
    this.marcadorShow = {...marcador };
    this.infoWindow.open(marker);
  }

  guardarStorage(): void {
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ));
  }

  editarMarcador( marcador: Marcador ): void {
    const dialogRef = this.dialog.open( MapaEditarComponent, {
        width: '250px',
        data: { titulo: marcador.titulo, desc: marcador.desc }
      });

    dialogRef.afterClosed().subscribe(result => {
        if ( result ) {
          marcador.titulo = result.titulo;
          marcador.desc = result.desc;

          this.actualizarListaMarcadores( marcador );
          this.guardarStorage();
          this.snackBar.open('Marcador editado', 'cerrar', {duration: 3000 });
        }
      });
  }

  actualizarListaMarcadores( marcador: Marcador ): void {
    this.marcadores
    .filter( elemento => elemento.lat === marcador.lat )
    .filter( elemento => elemento.lng === marcador.lng )
    .forEach(element => {
      element.titulo = marcador.titulo;
      element.desc = marcador.desc;
    });
  }

  borrarMarcador( marcador: Marcador ): void {
    const markerIndex = this.marcadores.findIndex( (x) => x.lat === marcador.lat && x.lng === marcador.lng );
    this.marcadores.splice( markerIndex , 1 );
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado', 'cerrar', {duration: 3000 });
  }
}
