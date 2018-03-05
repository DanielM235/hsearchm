/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HsearchmTestModule } from '../../../test.module';
import { NodeContentDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/node-content/node-content-delete-dialog.component';
import { NodeContentService } from '../../../../../../main/webapp/app/entities/node-content/node-content.service';

describe('Component Tests', () => {

    describe('NodeContent Management Delete Component', () => {
        let comp: NodeContentDeleteDialogComponent;
        let fixture: ComponentFixture<NodeContentDeleteDialogComponent>;
        let service: NodeContentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HsearchmTestModule],
                declarations: [NodeContentDeleteDialogComponent],
                providers: [
                    NodeContentService
                ]
            })
            .overrideTemplate(NodeContentDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NodeContentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NodeContentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
