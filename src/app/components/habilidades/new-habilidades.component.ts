import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from '../../service/skill.service';

@Component({
  selector: 'app-new-habilidades',
  templateUrl: './new-habilidades.component.html',
  styleUrls: ['./new-habilidades.component.css']
})
export class NewHabilidadesComponent implements OnInit {
  nombre: string;
  porcentaje: number;

  constructor(private skillS: SkillService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const skill = new Skill(this.nombre, this.porcentaje);
    this.skillS.save(skill).subscribe(data => {
      alert("Habilidad creada");
      this.router.navigate(['']);
    }, err => {
      alert("Fallo al añadir la habilidad");
      this.router.navigate(['']);
    }
    );
  }

}
