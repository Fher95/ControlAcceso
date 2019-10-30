import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AsistenciaService } from 'app/entities/asistencia/asistencia.service';
import { IAsistencia, Asistencia } from 'app/shared/model/asistencia.model';

describe('Service Tests', () => {
  describe('Asistencia Service', () => {
    let injector: TestBed;
    let service: AsistenciaService;
    let httpMock: HttpTestingController;
    let elemDefault: IAsistencia;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AsistenciaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Asistencia(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        currentDate,
        currentDate,
        false,
        false,
        false,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
            entrada: currentDate.format(DATE_TIME_FORMAT),
            salida: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Asistencia', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            entrada: currentDate.format(DATE_TIME_FORMAT),
            salida: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            entrada: currentDate,
            salida: currentDate
          },
          returnedFromService
        );
        service
          .create(new Asistencia(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Asistencia', () => {
        const returnedFromService = Object.assign(
          {
            nombre1: 'BBBBBB',
            nombre2: 'BBBBBB',
            apellido1: 'BBBBBB',
            apellido2: 'BBBBBB',
            fecha: currentDate.format(DATE_TIME_FORMAT),
            turno: 'BBBBBB',
            entrada: currentDate.format(DATE_TIME_FORMAT),
            salida: currentDate.format(DATE_TIME_FORMAT),
            sinEntrada: true,
            sinSalida: true,
            ausente: true,
            minutosTrabajados: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
            entrada: currentDate,
            salida: currentDate
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

      it('should return a list of Asistencia', () => {
        const returnedFromService = Object.assign(
          {
            nombre1: 'BBBBBB',
            nombre2: 'BBBBBB',
            apellido1: 'BBBBBB',
            apellido2: 'BBBBBB',
            fecha: currentDate.format(DATE_TIME_FORMAT),
            turno: 'BBBBBB',
            entrada: currentDate.format(DATE_TIME_FORMAT),
            salida: currentDate.format(DATE_TIME_FORMAT),
            sinEntrada: true,
            sinSalida: true,
            ausente: true,
            minutosTrabajados: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            entrada: currentDate,
            salida: currentDate
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

      it('should delete a Asistencia', () => {
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
