/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HsearchmTestModule } from '../../../test.module';
import { NodeContentDetailComponent } from '../../../../../../main/webapp/app/entities/node-content/node-content-detail.component';
import { NodeContentService } from '../../../../../../main/webapp/app/entities/node-content/node-content.service';
import { NodeContent } from '../../../../../../main/webapp/app/entities/node-content/node-content.model';

describe('Component Tests', () => {

    describe('NodeContent Management Detail Component', () => {
        let comp: NodeContentDetailComponent;
        let fixture: ComponentFixture<NodeContentDetailComponent>;
        let service: NodeContentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HsearchmTestModule],
                declarations: [NodeContentDetailComponent],
                providers: [
                    NodeContentService
                ]
            })
            .overrideTemplate(NodeContentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NodeContentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NodeContentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NodeContent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.nodeContent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
