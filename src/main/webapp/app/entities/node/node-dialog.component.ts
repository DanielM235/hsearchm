import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Node } from './node.model';
import { NodePopupService } from './node-popup.service';
import { NodeService } from './node.service';

@Component({
    selector: 'jhi-node-dialog',
    templateUrl: './node-dialog.component.html'
})
export class NodeDialogComponent implements OnInit {

    node: Node;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private nodeService: NodeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.node.id !== undefined) {
            this.subscribeToSaveResponse(
                this.nodeService.update(this.node));
        } else {
            this.subscribeToSaveResponse(
                this.nodeService.create(this.node));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Node>>) {
        result.subscribe((res: HttpResponse<Node>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Node) {
        this.eventManager.broadcast({ name: 'nodeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-node-popup',
    template: ''
})
export class NodePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nodePopupService: NodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nodePopupService
                    .open(NodeDialogComponent as Component, params['id']);
            } else {
                this.nodePopupService
                    .open(NodeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
