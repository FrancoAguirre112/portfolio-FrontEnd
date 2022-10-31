import { Component, OnInit } from '@angular/core';
import { EducacionService } from '../../service/educacion.service';
import { Router } from '@angular/router';
import { Educacion } from '../../model/educacion';
import { ImageService } from 'src/app/service/image.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-neweducacion',
  templateUrl: './neweducacion.component.html',
  styleUrls: ['./neweducacion.component.css'],
})
export class NeweducacionComponent implements OnInit {
  nombreE: string;
  descripcionE: string;
  imgE: string;
  uploadingImg: boolean = false;

  constructor(
    private educacionS: EducacionService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const educacion = new Educacion(this.nombreE, this.descripcionE, this.imageService.url);
    this.educacionS.save(educacion).subscribe(
      (data) => {
        alert('Educacion añadida');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Falló');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.uploadingImg = true;
    const name = 'educacion_' + uuidv4();
    this.imageService.uploadImage($event, name);
    setTimeout(() => {
      this.uploadingImg = false;
    }, 1000);
  }
}
