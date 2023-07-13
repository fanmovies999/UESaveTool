import { Property } from './index.js'
import { Serializer } from '../../utils/index.js';
import { SerializationError } from '../PropertyErrors.js';

export class Int64Property extends Property {
    constructor() {
        super();
        this.Property = [];
    }
    get Size() {
        return this.Name.length + 4
            + this.Type.length + 4
            + 17;
    }
    deserialize(serial) {
        this.Property[0] = serial.readInt32();
        serial.seek(1);
        this.Property[1] = serial.readInt64();
        return this;
    }
    serialize() {
        let serial = Serializer.alloc(this.Size);
        serial.writeString(this.Name); // 4 bytes for length of name in int32 + length(Name) 
        serial.writeString(this.Type); // 4 bytes for length of name in int32 + length(Type) 
        serial.writeInt32(8); // int32 => 4 bytes
        serial.writeInt32(this.Property[0]); // (0) int32 => 4 bytes
        serial.seek(1);  // add a 0 => 1 byte 
        serial.writeInt64(this.Property[1]);  // (value) int64 => 8 bytes
        if (serial.tell !== this.Size)
            throw new SerializationError(this);
        return serial.Data;
    }
    static from(obj) {
        let prop = new Int64Property();
        Object.assign(prop, obj);
        return prop;
    }
}
