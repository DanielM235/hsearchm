import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NodeComponent } from './node.component';
import { NodeDetailComponent } from './node-detail.component';
import { NodePopupComponent } from './node-dialog.component';
import { NodeDeletePopupComponent } from './node-delete-dialog.component';

export const nodeRoute: Routes = [
    {
        path: 'node',
        component: NodeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.node.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'node/:id',
        component: NodeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.node.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nodePopupRoute: Routes = [
    {
        path: 'node-new',
        component: NodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.node.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'node/:id/edit',
        component: NodePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.node.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'node/:id/delete',
        component: NodeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hsearchmApp.node.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
