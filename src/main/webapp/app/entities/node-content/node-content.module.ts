import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HsearchmSharedModule } from '../../shared';
import {
    NodeContentService,
    NodeContentPopupService,
    NodeContentComponent,
    NodeContentDetailComponent,
    NodeContentDialogComponent,
    NodeContentPopupComponent,
    NodeContentDeletePopupComponent,
    NodeContentDeleteDialogComponent,
    nodeContentRoute,
    nodeContentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...nodeContentRoute,
    ...nodeContentPopupRoute,
];

@NgModule({
    imports: [
        HsearchmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NodeContentComponent,
        NodeContentDetailComponent,
        NodeContentDialogComponent,
        NodeContentDeleteDialogComponent,
        NodeContentPopupComponent,
        NodeContentDeletePopupComponent,
    ],
    entryComponents: [
        NodeContentComponent,
        NodeContentDialogComponent,
        NodeContentPopupComponent,
        NodeContentDeleteDialogComponent,
        NodeContentDeletePopupComponent,
    ],
    providers: [
        NodeContentService,
        NodeContentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HsearchmNodeContentModule {}
