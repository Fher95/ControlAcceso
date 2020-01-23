import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'jhi-asignacion-masiva',
  templateUrl: './asignacion-masiva.component.html',
  styleUrls: ['./asignacion-masiva.component.scss']
})
export class AsignacionMasivaComponent implements OnInit {
  editForm = this.fb.group({
    id: [],
    fecha: [],
    turno: [this, [Validators.required]],
    colaboradors: [],
    planeacionSemanal: [],
    cargo: [this, [Validators.required]],
    centroDeCosto: []
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
