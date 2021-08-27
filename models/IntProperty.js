import { Property } from './index.js'

export class IntProperty extends Property {
    constructor({name, type, value}) {
        super({name, type, value});
        this.Size = 4;
    }
}