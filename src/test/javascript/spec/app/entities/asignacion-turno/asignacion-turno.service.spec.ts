import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AsignacionTurnoService } from 'app/entities/asignacion-turno/asignacion-turno.service';
import { IAsignacionTurno, AsignacionTurno } from 'app/shared/model/asignacion-turno.model';

describe('Service Tests', () => {
  describe('AsignacionTurno Service', () => {
    let injector: TestBed;
    let service: AsignacionTurnoService;
    let httpMock: HttpTestingController;
    let elemDefault: IAsignacionTurno;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AsignacionTurnoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AsignacionTurno(0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
            fechaFin: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a AsignacionTurno', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            fechaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );
        service
          .create(new AsignacionTurno(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a AsignacionTurno', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
            fechaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
            fechaFin: currentDate
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

      it('should return a list of AsignacionTurno', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
            fechaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fecha: currentDate,
            fechaFin: currentDate
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

      it('should delete a AsignacionTurno', () => {
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
