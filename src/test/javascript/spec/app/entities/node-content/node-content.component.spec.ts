/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HsearchmTestModule } from '../../../test.module';
import { NodeContentComponent } from '../../../../../../main/webapp/app/entities/node-content/node-content.component';
import { NodeContentService } from '../../../../../../main/webapp/app/entities/node-content/node-content.service';
import { NodeContent } from '../../../../../../main/webapp/app/entities/node-content/node-content.model';

describe('Component Tests', () => {

    describe('NodeContent Management Component', () => {
        let comp: NodeContentComponent;
        let fixture: ComponentFixture<NodeContentComponent>;
        let service: NodeContentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HsearchmTestModule],
                declarations: [NodeContentComponent],
                providers: [
                    NodeContentService
                ]
            })
            .overrideTemplate(NodeContentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NodeContentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NodeContentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NodeContent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.nodeContents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
