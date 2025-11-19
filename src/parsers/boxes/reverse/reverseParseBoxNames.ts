import type { Box } from "$parsers/types";
import { writeString } from "$parsers/utils";
import addresses from '$data/addresses.json'

function reverseParseBoxNames(file: Uint8Array, boxes: Box[]): Uint8Array {
  for (let box = 0; box < 16; box++) {
    file = writeString(file, addresses.sBackupNewBox1 + 33 * box + 23, 9, false, boxes[box].name);
  }
  return file
}

export default reverseParseBoxNames
