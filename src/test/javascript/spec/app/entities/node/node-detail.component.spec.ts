/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HsearchmTestModule } from '../../../test.module';
import { NodeDetailComponent } from '../../../../../../main/webapp/app/entities/node/node-detail.component';
import { NodeService } from '../../../../../../main/webapp/app/entities/node/node.service';
import { Node } from '../../../../../../main/webapp/app/entities/node/node.model';

describe('Component Tests', () => {

    describe('Node Management Detail Component', () => {
        let comp: NodeDetailComponent;
        let fixture: ComponentFixture<NodeDetailComponent>;
        let service: NodeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HsearchmTestModule],
                declarations: [NodeDetailComponent],
                providers: [
                    NodeService
                ]
            })
            .overrideTemplate(NodeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NodeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NodeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Node(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.node).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
