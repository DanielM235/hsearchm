import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HsearchmSharedModule } from '../../shared';
import {
    NodeService,
    NodePopupService,
    NodeComponent,
    NodeDetailComponent,
    NodeDialogComponent,
    NodePopupComponent,
    NodeDeletePopupComponent,
    NodeDeleteDialogComponent,
    nodeRoute,
    nodePopupRoute,
} from './';

const ENTITY_STATES = [
    ...nodeRoute,
    ...nodePopupRoute,
];

@NgModule({
    imports: [
        HsearchmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NodeComponent,
        NodeDetailComponent,
        NodeDialogComponent,
        NodeDeleteDialogComponent,
        NodePopupComponent,
        NodeDeletePopupComponent,
    ],
    entryComponents: [
        NodeComponent,
        NodeDialogComponent,
        NodePopupComponent,
        NodeDeleteDialogComponent,
        NodeDeletePopupComponent,
    ],
    providers: [
        NodeService,
        NodePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HsearchmNodeModule {}
