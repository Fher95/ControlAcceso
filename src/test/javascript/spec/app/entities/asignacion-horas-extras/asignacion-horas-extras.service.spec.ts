import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AsignacionHorasExtrasService } from 'app/entities/asignacion-horas-extras/asignacion-horas-extras.service';
import { IAsignacionHorasExtras, AsignacionHorasExtras } from 'app/shared/model/asignacion-horas-extras.model';

describe('Service Tests', () => {
  describe('AsignacionHorasExtras Service', () => {
    let injector: TestBed;
    let service: AsignacionHorasExtrasService;
    let httpMock: HttpTestingController;
    let elemDefault: IAsignacionHorasExtras;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AsignacionHorasExtrasService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AsignacionHorasExtras(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, currentDate, false, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFin: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a AsignacionHorasExtras', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            horaInicio: currentDate,
            horaFin: currentDate
          },
          returnedFromService
        );
        service
          .create(new AsignacionHorasExtras(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a AsignacionHorasExtras', () => {
        const returnedFromService = Object.assign(
          {
            justificacion: 'BBBBBB',
            observaciones: 'BBBBBB',
            fecha: currentDate.format(DATE_TIME_FORMAT),
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFin: currentDate.format(DATE_TIME_FORMAT),
            compensatorio: true,
            autorizadasPor: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
            horaInicio: currentDate,
            horaFin: currentDate
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

      it('should return a list of AsignacionHorasExtras', () => {
        const returnedFromService = Object.assign(
          {
            justificacion: 'BBBBBB',
            observaciones: 'BBBBBB',
            fecha: currentDate.format(DATE_TIME_FORMAT),
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFin: currentDate.format(DATE_TIME_FORMAT),
            compensatorio: true,
            autorizadasPor: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            horaInicio: currentDate,
            horaFin: currentDate
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

      it('should delete a AsignacionHorasExtras', () => {
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
