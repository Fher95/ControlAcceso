import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ControlAccesoTestModule } from '../../../test.module';
import { PeticionDetailComponent } from 'app/entities/peticion/peticion-detail.component';
import { Peticion } from 'app/shared/model/peticion.model';

describe('Component Tests', () => {
  describe('Peticion Management Detail Component', () => {
    let comp: PeticionDetailComponent;
    let fixture: ComponentFixture<PeticionDetailComponent>;
    const route = ({ data: of({ peticion: new Peticion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ControlAccesoTestModule],
        declarations: [PeticionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PeticionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PeticionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.peticion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
