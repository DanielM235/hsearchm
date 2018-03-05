import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Node } from './node.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Node>;

@Injectable()
export class NodeService {

    private resourceUrl =  SERVER_API_URL + 'api/nodes';

    constructor(private http: HttpClient) { }

    create(node: Node): Observable<EntityResponseType> {
        const copy = this.convert(node);
        return this.http.post<Node>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(node: Node): Observable<EntityResponseType> {
        const copy = this.convert(node);
        return this.http.put<Node>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Node>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Node[]>> {
        const options = createRequestOption(req);
        return this.http.get<Node[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Node[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Node = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Node[]>): HttpResponse<Node[]> {
        const jsonResponse: Node[] = res.body;
        const body: Node[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Node.
     */
    private convertItemFromServer(node: Node): Node {
        const copy: Node = Object.assign({}, node);
        return copy;
    }

    /**
     * Convert a Node to a JSON which can be sent to the server.
     */
    private convert(node: Node): Node {
        const copy: Node = Object.assign({}, node);
        return copy;
    }
}
