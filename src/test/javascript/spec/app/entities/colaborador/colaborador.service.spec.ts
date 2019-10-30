import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { IColaborador, Colaborador } from 'app/shared/model/colaborador.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

describe('Service Tests', () => {
  describe('Colaborador Service', () => {
    let injector: TestBed;
    let service: ColaboradorService;
    let httpMock: HttpTestingController;
    let elemDefault: IColaborador;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ColaboradorService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Colaborador(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        Estado.Activo,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaExpedicion: currentDate.format(DATE_TIME_FORMAT),
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            fechaBaja: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Colaborador', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaExpedicion: currentDate.format(DATE_TIME_FORMAT),
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            fechaBaja: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaExpedicion: currentDate,
            fechaNacimiento: currentDate,
            fechaIngreso: currentDate,
            fechaBaja: currentDate
          },
          returnedFromService
        );
        service
          .create(new Colaborador(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Colaborador', () => {
        const returnedFromService = Object.assign(
          {
            nombre1: 'BBBBBB',
            nombre2: 'BBBBBB',
            apellido1: 'BBBBBB',
            apellido2: 'BBBBBB',
            tipoDocumento: 'BBBBBB',
            numeroDocumento: 'BBBBBB',
            lugarExpedicion: 'BBBBBB',
            fechaExpedicion: currentDate.format(DATE_TIME_FORMAT),
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            direccionResidencia: 'BBBBBB',
            barrio: 'BBBBBB',
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            tiempoRequerido: 1,
            cargoDesempeniar: 'BBBBBB',
            salario: 1,
            eps: 'BBBBBB',
            estado: 'BBBBBB',
            fechaBaja: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaExpedicion: currentDate,
            fechaNacimiento: currentDate,
            fechaIngreso: currentDate,
            fechaBaja: currentDate
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

      it('should return a list of Colaborador', () => {
        const returnedFromService = Object.assign(
          {
            nombre1: 'BBBBBB',
            nombre2: 'BBBBBB',
            apellido1: 'BBBBBB',
            apellido2: 'BBBBBB',
            tipoDocumento: 'BBBBBB',
            numeroDocumento: 'BBBBBB',
            lugarExpedicion: 'BBBBBB',
            fechaExpedicion: currentDate.format(DATE_TIME_FORMAT),
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            direccionResidencia: 'BBBBBB',
            barrio: 'BBBBBB',
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            tiempoRequerido: 1,
            cargoDesempeniar: 'BBBBBB',
            salario: 1,
            eps: 'BBBBBB',
            estado: 'BBBBBB',
            fechaBaja: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaExpedicion: currentDate,
            fechaNacimiento: currentDate,
            fechaIngreso: currentDate,
            fechaBaja: currentDate
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

      it('should delete a Colaborador', () => {
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
