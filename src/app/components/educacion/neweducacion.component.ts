import { Component, OnInit } from '@angular/core';
import { EducacionService } from '../../service/educacion.service';
import { Router } from '@angular/router';
import { Educacion } from '../../model/educacion';

@Component({
  selector: 'app-neweducacion',
  templateUrl: './neweducacion.component.html',
  styleUrls: ['./neweducacion.component.css']
})
export class NeweducacionComponent implements OnInit {
  nombreE: string;
  descripcionE: string;

  constructor(private educacionS: EducacionService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const educacion = new Educacion(this.nombreE, this.descripcionE);
    this.educacionS.save(educacion).subscribe(data => {
      alert("Educacion añadida");
      this.router.navigate(['']);
    }, err => {
      alert('Falló');
      this.router.navigate([''])
    }
    )
  }

}
