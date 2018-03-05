import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NodeContent } from './node-content.model';
import { NodeContentPopupService } from './node-content-popup.service';
import { NodeContentService } from './node-content.service';
import { Node, NodeService } from '../node';

@Component({
    selector: 'jhi-node-content-dialog',
    templateUrl: './node-content-dialog.component.html'
})
export class NodeContentDialogComponent implements OnInit {

    nodeContent: NodeContent;
    isSaving: boolean;

    nodes: Node[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private nodeContentService: NodeContentService,
        private nodeService: NodeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.nodeService.query()
            .subscribe((res: HttpResponse<Node[]>) => { this.nodes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.nodeContent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.nodeContentService.update(this.nodeContent));
        } else {
            this.subscribeToSaveResponse(
                this.nodeContentService.create(this.nodeContent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NodeContent>>) {
        result.subscribe((res: HttpResponse<NodeContent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NodeContent) {
        this.eventManager.broadcast({ name: 'nodeContentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNodeById(index: number, item: Node) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-node-content-popup',
    template: ''
})
export class NodeContentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nodeContentPopupService: NodeContentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nodeContentPopupService
                    .open(NodeContentDialogComponent as Component, params['id']);
            } else {
                this.nodeContentPopupService
                    .open(NodeContentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
