import { BaseEntity } from './../../shared';

export class Node implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
    ) {
    }
}
