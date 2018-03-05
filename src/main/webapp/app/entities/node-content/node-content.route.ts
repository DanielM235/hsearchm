import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NodeContentComponent } from './node-content.component';
import { NodeContentDetailComponent } from './node-content-detail.component';
import { NodeContentPopupComponent } from './node-content-dialog.component';
import { NodeContentDeletePopupComponent } from './node-content-delete-dialog.component';

export const nodeContentRoute: Routes = [
    {
        path: 'node-content',
        component: NodeContentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.nodeContent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'node-content/:id',
        component: NodeContentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.nodeContent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nodeContentPopupRoute: Routes = [
    {
        path: 'node-content-new',
        component: NodeContentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.nodeContent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'node-content/:id/edit',
        component: NodeContentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.nodeContent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'node-content/:id/delete',
        component: NodeContentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.nodeContent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
