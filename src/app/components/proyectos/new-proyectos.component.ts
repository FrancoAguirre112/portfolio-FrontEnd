import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../service/proyectos.service';
import { Router} from '@angular/router';
import { Proyectos } from '../../model/proyectos';
import { ImageService } from '../../service/image.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css'],
})
export class NewProyectosComponent implements OnInit {
  nombre: string;
  descripcion: string;
  img: string;
  link: string;
  uploadingImg: boolean = false;

  constructor(
    private proyectosService: ProyectosService,
    private router: Router,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const proyectos = new Proyectos(
      this.nombre,
      this.descripcion,
      this.imageService.url,
      this.link
    );
    this.proyectosService.save(proyectos).subscribe(
      (data) => {
        alert('Proyecto creado');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Fallo al añadir el proyecto');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.uploadingImg = true;
    const name = 'proyecto_' + uuidv4();
    this.imageService.uploadImage($event, name);
    setTimeout(() => {
      this.uploadingImg = false;
    }, 1000);
  }
}
