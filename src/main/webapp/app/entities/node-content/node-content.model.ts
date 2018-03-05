import { BaseEntity } from './../../shared';

export class NodeContent implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public content?: string,
        public node?: BaseEntity,
    ) {
    }
}
