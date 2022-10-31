import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../../service/persona.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-editacerca-de',
  templateUrl: './editacerca-de.component.html',
  styleUrls: ['./editacerca-de.component.css'],
})
export class EditacercaDeComponent implements OnInit {
  persona: persona = new persona();
  uploadingImg: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private personaService: PersonaService,
    private router: Router,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      (data) => {
        this.persona = data;
      },
      (err) => {
        alert('Error al modificar');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.persona.img = this.imageService.url;
    this.personaService.update(id, this.persona).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al modificar la persona');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.uploadingImg = true;
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_"+ id;
    this.imageService.uploadImage($event, name);
    setTimeout(() => {
      this.uploadingImg = false;
    }, 1000);
  }
}
