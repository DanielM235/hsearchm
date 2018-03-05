import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { NodeContent } from './node-content.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NodeContent>;

@Injectable()
export class NodeContentService {

    private resourceUrl =  SERVER_API_URL + 'api/node-contents';

    constructor(private http: HttpClient) { }

    create(nodeContent: NodeContent): Observable<EntityResponseType> {
        const copy = this.convert(nodeContent);
        return this.http.post<NodeContent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(nodeContent: NodeContent): Observable<EntityResponseType> {
        const copy = this.convert(nodeContent);
        return this.http.put<NodeContent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NodeContent>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NodeContent[]>> {
        const options = createRequestOption(req);
        return this.http.get<NodeContent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NodeContent[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NodeContent = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NodeContent[]>): HttpResponse<NodeContent[]> {
        const jsonResponse: NodeContent[] = res.body;
        const body: NodeContent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NodeContent.
     */
    private convertItemFromServer(nodeContent: NodeContent): NodeContent {
        const copy: NodeContent = Object.assign({}, nodeContent);
        return copy;
    }

    /**
     * Convert a NodeContent to a JSON which can be sent to the server.
     */
    private convert(nodeContent: NodeContent): NodeContent {
        const copy: NodeContent = Object.assign({}, nodeContent);
        return copy;
    }
}
