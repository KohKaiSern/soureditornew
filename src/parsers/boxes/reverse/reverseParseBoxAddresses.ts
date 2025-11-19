import addresses from '$data/addresses.json';
import type { Box } from '$parsers/types';

//For convenience:
//Bitflags will always be unset from Boxes 1-8, and set for Boxes 9-16.
export function reverseParseBoxAddresses(file: Uint8Array, boxes: Box[]): Uint8Array {
  let index = 1
  for (let box = 0; box < 16; box++) {
    //Indexes
    for (let i = 0; i < 20; i++) {
      if (index === 161) index = 1;
      if (!boxes[box].mons[i]) {
        file[addresses.sBackupNewBox1 + 33 * box + i] = 0;
      } else {
        file[addresses.sBackupNewBox1 + 33 * box + i] = index;
        index++;
      }
    }
    //Bitflags
    if (box < 8) {
      file.set([0, 0, 0], addresses.sBackupNewBox1 + 33 * box + 20)
    } else {
      file.set([0xFF, 0xFF, 0x0F], addresses.sBackupNewBox1 + 33 * box + 20)
    }
  }
  return file
};

export default reverseParseBoxAddresses;
