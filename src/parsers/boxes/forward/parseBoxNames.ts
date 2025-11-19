import addresses from "$data/addresses.json"
import { readString } from "$parsers/utils";

function parseBoxNames(file: Uint8Array): string[][] {
  const names: string[][] = [];
  for (let box = 0; box < 16; box++) {
    const address = addresses.sBackupNewBox1 + 33 * box + 23;
    names.push(readString(file, address, 9, false));
  }
  return names;
}

export default parseBoxNames
