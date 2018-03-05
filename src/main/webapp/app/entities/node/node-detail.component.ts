import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Node } from './node.model';
import { NodeService } from './node.service';

@Component({
    selector: 'jhi-node-detail',
    templateUrl: './node-detail.component.html'
})
export class NodeDetailComponent implements OnInit, OnDestroy {

    node: Node;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nodeService: NodeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNodes();
    }

    load(id) {
        this.nodeService.find(id)
            .subscribe((nodeResponse: HttpResponse<Node>) => {
                this.node = nodeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNodes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nodeListModification',
            (response) => this.load(this.node.id)
        );
    }
}
