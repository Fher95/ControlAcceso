import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NovedadesService } from 'app/entities/novedades/novedades.service';
import { INovedades, Novedades } from 'app/shared/model/novedades.model';
import { EstadoPeticion } from 'app/shared/model/enumerations/estado-peticion.model';

describe('Service Tests', () => {
  describe('Novedades Service', () => {
    let injector: TestBed;
    let service: NovedadesService;
    let httpMock: HttpTestingController;
    let elemDefault: INovedades;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NovedadesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Novedades(0, 'AAAAAAA', EstadoPeticion.Autorizada, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaInicial: currentDate.format(DATE_TIME_FORMAT),
            fechaFinal: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Novedades', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaInicial: currentDate.format(DATE_TIME_FORMAT),
            fechaFinal: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicial: currentDate,
            fechaFinal: currentDate
          },
          returnedFromService
        );
        service
          .create(new Novedades(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Novedades', () => {
        const returnedFromService = Object.assign(
          {
            justificacion: 'BBBBBB',
            estado: 'BBBBBB',
            fechaInicial: currentDate.format(DATE_TIME_FORMAT),
            fechaFinal: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaInicial: currentDate,
            fechaFinal: currentDate
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

      it('should return a list of Novedades', () => {
        const returnedFromService = Object.assign(
          {
            justificacion: 'BBBBBB',
            estado: 'BBBBBB',
            fechaInicial: currentDate.format(DATE_TIME_FORMAT),
            fechaFinal: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaInicial: currentDate,
            fechaFinal: currentDate
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

      it('should delete a Novedades', () => {
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
