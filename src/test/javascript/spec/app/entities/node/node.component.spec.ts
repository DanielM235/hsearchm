/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HsearchmTestModule } from '../../../test.module';
import { NodeComponent } from '../../../../../../main/webapp/app/entities/node/node.component';
import { NodeService } from '../../../../../../main/webapp/app/entities/node/node.service';
import { Node } from '../../../../../../main/webapp/app/entities/node/node.model';

describe('Component Tests', () => {

    describe('Node Management Component', () => {
        let comp: NodeComponent;
        let fixture: ComponentFixture<NodeComponent>;
        let service: NodeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HsearchmTestModule],
                declarations: [NodeComponent],
                providers: [
                    NodeService
                ]
            })
            .overrideTemplate(NodeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NodeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NodeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Node(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.nodes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
