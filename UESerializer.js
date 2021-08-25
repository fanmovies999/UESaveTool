import { fs, Buffer, argv, Writer } from './index.js'
import { Gvas } from './Gvas.js'

function UESerializer() 
{
    const gvas = Gvas.fromFile(argv[2]);
    // console.log(JSON.stringify(gvas));
    const io = new Writer();
    try {
        io.open('./output.sav');
        io.write(Buffer.from(gvas.Header));
        io.writeInt32(gvas.SaveGameVersion);
        io.writeInt32(gvas.PackageVersion);
        io.writeInt16(gvas.EngineVersion.Major);
        io.writeInt16(gvas.EngineVersion.Minor);
        io.writeInt16(gvas.EngineVersion.Patch);
        io.writeInt32(gvas.EngineVersion.Build);
        io.writeString(gvas.EngineVersion.BuildId);
        io.writeInt32(gvas.CustomFormatVersion);
        io.writeInt32(gvas.CustomFormatData.Count);
        for(let i = 0; i < gvas.CustomFormatData.Count; i++) {
            io.writeGuid(gvas.CustomFormatData.Entries[i]['Id']);
            io.writeInt32(gvas.CustomFormatData.Entries[i]['Value']);
        }
        io.writeString(gvas.SaveGameType);
        //TODO Write Properties
    }
    catch(e) {
        console.log(e);
    }
    finally {
        io.close();
        console.log('Done.');
    }
}

__MAIN:
UESerializer();