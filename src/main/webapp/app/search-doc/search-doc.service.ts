import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchDocService {
    private url = 'api/nodes';

    constructor(private http: HttpClient) {}
    /**
     * Get nodesDesc by criteria.
     * @param criteria the search criteria.
     * @return observable of list of String.
     */
    getDocumentations(criteria: string): Observable<Node[]> {
        return this.http.post(`${this.url}/search`, criteria);
    }
}
