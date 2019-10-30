import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'turno',
        loadChildren: () => import('./turno/turno.module').then(m => m.ControlAccesoTurnoModule)
      },
      {
        path: 'asignacion-turno',
        loadChildren: () => import('./asignacion-turno/asignacion-turno.module').then(m => m.ControlAccesoAsignacionTurnoModule)
      },
      {
        path: 'cargo',
        loadChildren: () => import('./cargo/cargo.module').then(m => m.ControlAccesoCargoModule)
      },
      {
        path: 'centro-costo',
        loadChildren: () => import('./centro-costo/centro-costo.module').then(m => m.ControlAccesoCentroCostoModule)
      },
      {
        path: 'colaborador',
        loadChildren: () => import('./colaborador/colaborador.module').then(m => m.ControlAccesoColaboradorModule)
      },
      {
        path: 'telefono',
        loadChildren: () => import('./telefono/telefono.module').then(m => m.ControlAccesoTelefonoModule)
      },
      {
        path: 'antecedentes',
        loadChildren: () => import('./antecedentes/antecedentes.module').then(m => m.ControlAccesoAntecedentesModule)
      },
      {
        path: 'peticion',
        loadChildren: () => import('./peticion/peticion.module').then(m => m.ControlAccesoPeticionModule)
      },
      {
        path: 'intercambio-turno',
        loadChildren: () => import('./intercambio-turno/intercambio-turno.module').then(m => m.ControlAccesoIntercambioTurnoModule)
      },
      {
        path: 'planeacion-semanal',
        loadChildren: () => import('./planeacion-semanal/planeacion-semanal.module').then(m => m.ControlAccesoPlaneacionSemanalModule)
      },
      {
        path: 'asignacion-horas-extras',
        loadChildren: () =>
          import('./asignacion-horas-extras/asignacion-horas-extras.module').then(m => m.ControlAccesoAsignacionHorasExtrasModule)
      },
      {
        path: 'asistencia',
        loadChildren: () => import('./asistencia/asistencia.module').then(m => m.ControlAccesoAsistenciaModule)
      },
      {
        path: 'asistencia-planeacion',
        loadChildren: () =>
          import('./asistencia-planeacion/asistencia-planeacion.module').then(m => m.ControlAccesoAsistenciaPlaneacionModule)
      },
      {
        path: 'reporte-asistencia',
        loadChildren: () => import('./reporte-asistencia/reporte-asistencia.module').then(m => m.ControlAccesoReporteAsistenciaModule)
      },
      {
        path: 'devengo-nomina',
        loadChildren: () => import('./devengo-nomina/devengo-nomina.module').then(m => m.ControlAccesoDevengoNominaModule)
      },
      {
        path: 'novedades',
        loadChildren: () => import('./novedades/novedades.module').then(m => m.ControlAccesoNovedadesModule)
      },
      {
        path: 'asistencia-horas-extras',
        loadChildren: () =>
          import('./asistencia-horas-extras/asistencia-horas-extras.module').then(m => m.ControlAccesoAsistenciaHorasExtrasModule)
      },
      {
        path: 'reporte-asistencia-horas-extras',
        loadChildren: () =>
          import('./reporte-asistencia-horas-extras/reporte-asistencia-horas-extras.module').then(
            m => m.ControlAccesoReporteAsistenciaHorasExtrasModule
          )
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ControlAccesoEntityModule {}
