import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NodeContent } from './node-content.model';
import { NodeContentPopupService } from './node-content-popup.service';
import { NodeContentService } from './node-content.service';

@Component({
    selector: 'jhi-node-content-delete-dialog',
    templateUrl: './node-content-delete-dialog.component.html'
})
export class NodeContentDeleteDialogComponent {

    nodeContent: NodeContent;

    constructor(
        private nodeContentService: NodeContentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nodeContentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'nodeContentListModification',
                content: 'Deleted an nodeContent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-node-content-delete-popup',
    template: ''
})
export class NodeContentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nodeContentPopupService: NodeContentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.nodeContentPopupService
                .open(NodeContentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
