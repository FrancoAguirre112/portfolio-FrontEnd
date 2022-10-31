import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { Proyectos } from '../../model/proyectos';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css'],
})
export class EditProyectosComponent implements OnInit {
  proyectos: Proyectos = null;
  uploadingImg: boolean = false;

  constructor(
    private proyectosService: ProyectosService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectosService.detail(id).subscribe(
      (data) => {
        this.proyectos = data;
      },
      (err) => {
        alert('Error al modificar');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectos.img = this.imageService.url;
    this.proyectosService.update(id, this.proyectos).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al modificar');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.uploadingImg = true;
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_"+ id;
    this.imageService.uploadImage($event, name);
    setTimeout(() => {
      this.uploadingImg = false;
    }, 1000);
  }
  
}
