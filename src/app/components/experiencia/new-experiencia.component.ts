import { Component, OnInit } from '@angular/core';
import { SExperienciaService } from '../../service/s-experiencia.service';
import { Router } from '@angular/router';
import { Experiencia } from '../../model/experiencia';
import { ImageService } from 'src/app/service/image.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css'],
})
export class NewExperienciaComponent implements OnInit {
  nombreE: string;
  descripcionE: string;
  imgE: string;
  uploadingImg: boolean = false;

  constructor(
    private sExperiencia: SExperienciaService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const expe = new Experiencia(this.nombreE, this.descripcionE, this.imageService.url);
    this.sExperiencia.save(expe).subscribe(
      (data) => {
        alert('Experiencia añadida');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.uploadingImg = true;
    const name = 'experiencia_' + uuidv4();
    this.imageService.uploadImage($event, name);
    setTimeout(() => {
      this.uploadingImg = false;
    }, 1000);
  }
}
