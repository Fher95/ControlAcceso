import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from './colaborador.service';

@Component({
  selector: 'jhi-colaborador-delete-dialog',
  templateUrl: './colaborador-delete-dialog.component.html'
})
export class ColaboradorDeleteDialogComponent {
  colaborador: IColaborador;

  constructor(
    protected colaboradorService: ColaboradorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.colaboradorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'colaboradorListModification',
        content: 'Deleted an colaborador'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-colaborador-delete-popup',
  template: ''
})
export class ColaboradorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ colaborador }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ColaboradorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.colaborador = colaborador;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/colaborador', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/colaborador', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
