import { Component, OnInit } from '@angular/core';
import { SExperienciaService } from '../../service/s-experiencia.service';
import { Experiencia } from '../../model/experiencia';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {
  expLab : Experiencia= null;
  uploadingImg: boolean = false;

  constructor(private sExperiencia:SExperienciaService, private activatedRouter: ActivatedRoute,
    private router: Router, private imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.details(id).subscribe(
      data =>{
        this.expLab = data;
      }, err => {
        alert("Error al modificar la experiencia");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.expLab.imgE = this.imageService.url;
    this.sExperiencia.update(id, this.expLab).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event: any) {
    this.uploadingImg = true;
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "experiencia_"+ id;
    this.imageService.uploadImage($event, name);
    setTimeout(() => {
      this.uploadingImg = false;
    }, 1000);
  }

}
