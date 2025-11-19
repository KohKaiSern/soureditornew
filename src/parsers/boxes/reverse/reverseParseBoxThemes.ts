import type { Box } from "$parsers/types";
import boxThemes from '$data/boxThemes.json'
import addresses from "$data/addresses.json";

function reverseParseBoxThemes(file: Uint8Array, boxes: Box[]): Uint8Array {
  for (let box = 0; box < 16; box++) {
    file[addresses.sBackupNewBox1 + 33 * box + 32] = boxThemes.find(b => b.name === boxes[box].theme)!.index
  }
  return file
}

export default reverseParseBoxThemes
