import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PlanificacionAsistenciaService } from 'app/entities/planificacion-asistencia/planificacion-asistencia.service';
import { IPlanificacionAsistencia, PlanificacionAsistencia } from 'app/shared/model/planificacion-asistencia.model';

describe('Service Tests', () => {
  describe('PlanificacionAsistencia Service', () => {
    let injector: TestBed;
    let service: PlanificacionAsistenciaService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlanificacionAsistencia;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PlanificacionAsistenciaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PlanificacionAsistencia(
        0,
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaInicioPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaFinPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaAsistenciaTurno: currentDate.format(DATE_TIME_FORMAT),
            horaInicioTurno: currentDate.format(DATE_TIME_FORMAT),
            horaFinTurno: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PlanificacionAsistencia', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaInicioPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaFinPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaAsistenciaTurno: currentDate.format(DATE_TIME_FORMAT),
            horaInicioTurno: currentDate.format(DATE_TIME_FORMAT),
            horaFinTurno: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicioPlanificacion: currentDate,
            fechaFinPlanificacion: currentDate,
            fechaAsistenciaTurno: currentDate,
            horaInicioTurno: currentDate,
            horaFinTurno: currentDate
          },
          returnedFromService
        );
        service
          .create(new PlanificacionAsistencia(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PlanificacionAsistencia', () => {
        const returnedFromService = Object.assign(
          {
            fechaInicioPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaFinPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaAsistenciaTurno: currentDate.format(DATE_TIME_FORMAT),
            horaInicioTurno: currentDate.format(DATE_TIME_FORMAT),
            horaFinTurno: currentDate.format(DATE_TIME_FORMAT),
            nombreCargo: 'BBBBBB',
            tiposAsistencia: 'BBBBBB',
            minutosDiferencia: 'BBBBBB',
            nombreTurno: 'BBBBBB',
            inasistenciaJustificada: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicioPlanificacion: currentDate,
            fechaFinPlanificacion: currentDate,
            fechaAsistenciaTurno: currentDate,
            horaInicioTurno: currentDate,
            horaFinTurno: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PlanificacionAsistencia', () => {
        const returnedFromService = Object.assign(
          {
            fechaInicioPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaFinPlanificacion: currentDate.format(DATE_TIME_FORMAT),
            fechaAsistenciaTurno: currentDate.format(DATE_TIME_FORMAT),
            horaInicioTurno: currentDate.format(DATE_TIME_FORMAT),
            horaFinTurno: currentDate.format(DATE_TIME_FORMAT),
            nombreCargo: 'BBBBBB',
            tiposAsistencia: 'BBBBBB',
            minutosDiferencia: 'BBBBBB',
            nombreTurno: 'BBBBBB',
            inasistenciaJustificada: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicioPlanificacion: currentDate,
            fechaFinPlanificacion: currentDate,
            fechaAsistenciaTurno: currentDate,
            horaInicioTurno: currentDate,
            horaFinTurno: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PlanificacionAsistencia', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
