import type { Box } from "$parsers/types";
import reverseParseBoxNames from "$parsers/boxes/reverse/reverseParseBoxNames";
import reverseParseBoxThemes from '$parsers/boxes/reverse/reverseParseBoxThemes'
import reverseParseBoxAddresses from "$parsers/boxes/reverse/reverseParseBoxAddresses";
import parseBoxAddresses from "$parsers/boxes/forward/parseBoxAddresses";
import { reverseParseBoxMon } from '$parsers/mon/reverseParseMon'
import checksumBoxMon from "$parsers/boxes/reverse/checksumBoxMon";

function reverseParseBoxes(file: Uint8Array, boxes: Box[]): Uint8Array {
  file = reverseParseBoxNames(file, boxes);
  file = reverseParseBoxThemes(file, boxes);
  file = reverseParseBoxAddresses(file, boxes);
  const addresses = parseBoxAddresses(file);
  for (let box = 0; box < 16; box++) {
    for (let i = 0; i < 20; i++) {
      if (boxes[box].mons[i]) {
        file = reverseParseBoxMon(file, addresses[box][i], boxes[box].mons[i]);
        file = checksumBoxMon(file, addresses[box][i]);
      }
    }
  }
  return file
}

export default reverseParseBoxes
