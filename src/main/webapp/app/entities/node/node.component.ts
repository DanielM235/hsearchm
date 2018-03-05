import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Node } from './node.model';
import { NodeService } from './node.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-node',
    templateUrl: './node.component.html'
})
export class NodeComponent implements OnInit, OnDestroy {
nodes: Node[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private nodeService: NodeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.nodeService.query().subscribe(
            (res: HttpResponse<Node[]>) => {
                this.nodes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNodes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Node) {
        return item.id;
    }
    registerChangeInNodes() {
        this.eventSubscriber = this.eventManager.subscribe('nodeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
