import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NodeContent } from './node-content.model';
import { NodeContentService } from './node-content.service';

@Component({
    selector: 'jhi-node-content-detail',
    templateUrl: './node-content-detail.component.html'
})
export class NodeContentDetailComponent implements OnInit, OnDestroy {

    nodeContent: NodeContent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nodeContentService: NodeContentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNodeContents();
    }

    load(id) {
        this.nodeContentService.find(id)
            .subscribe((nodeContentResponse: HttpResponse<NodeContent>) => {
                this.nodeContent = nodeContentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNodeContents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nodeContentListModification',
            (response) => this.load(this.nodeContent.id)
        );
    }
}
