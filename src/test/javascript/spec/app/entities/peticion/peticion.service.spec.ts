import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PeticionService } from 'app/entities/peticion/peticion.service';
import { IPeticion, Peticion } from 'app/shared/model/peticion.model';
import { TipoPeticion } from 'app/shared/model/enumerations/tipo-peticion.model';
import { TipoPermiso } from 'app/shared/model/enumerations/tipo-permiso.model';
import { EstadoPeticion } from 'app/shared/model/enumerations/estado-peticion.model';

describe('Service Tests', () => {
  describe('Peticion Service', () => {
    let injector: TestBed;
    let service: PeticionService;
    let httpMock: HttpTestingController;
    let elemDefault: IPeticion;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PeticionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Peticion(
        0,
        TipoPeticion.Vacaciones,
        TipoPermiso.Luto,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        EstadoPeticion.Autorizada,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaPeticion: currentDate.format(DATE_TIME_FORMAT),
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a Peticion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaPeticion: currentDate.format(DATE_TIME_FORMAT),
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
            fechaFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaPeticion: currentDate,
            fechaInicio: currentDate,
            fechaFin: currentDate
          },
          returnedFromService
        );
        service
          .create(new Peticion(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Peticion', () => {
        const returnedFromService = Object.assign(
          {
            tipo: 'BBBBBB',
            tipoPermiso: 'BBBBBB',
            fechaPeticion: currentDate.format(DATE_TIME_FORMAT),
            motivo: 'BBBBBB',
            constancia: 'BBBBBB',
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
            fechaFin: currentDate.format(DATE_TIME_FORMAT),
            estado: 'BBBBBB',
            autorizadoPor: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPeticion: currentDate,
            fechaInicio: currentDate,
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

      it('should return a list of Peticion', () => {
        const returnedFromService = Object.assign(
          {
            tipo: 'BBBBBB',
            tipoPermiso: 'BBBBBB',
            fechaPeticion: currentDate.format(DATE_TIME_FORMAT),
            motivo: 'BBBBBB',
            constancia: 'BBBBBB',
            fechaInicio: currentDate.format(DATE_TIME_FORMAT),
            fechaFin: currentDate.format(DATE_TIME_FORMAT),
            estado: 'BBBBBB',
            autorizadoPor: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaPeticion: currentDate,
            fechaInicio: currentDate,
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

      it('should delete a Peticion', () => {
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
