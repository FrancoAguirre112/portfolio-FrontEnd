import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { Proyectos } from '../../model/proyectos';
import { ProyectosService } from '../../service/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyectos[] = [];

  constructor(private proyectosService: ProyectosService, private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarProyectosService();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyectosService(): void {
    this.proyectosService.lista().subscribe(data => {
      this.proyectos = data;
    }
    );
  }

  delete(id: number): void {
    if(id != undefined){
      this.proyectosService.delete(id).subscribe(data => {
        this.cargarProyectosService();
      }, err => {
        alert("No se pudo borrar el proyecto");
      }
      )
    }
  }

}
