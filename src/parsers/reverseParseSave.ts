import reverseParseParty from "$parsers/party/reverseParseParty";
import reverseParseBoxes from "$parsers/boxes/reverse/reverseParseBoxes";
import type { Data } from "$parsers/types";

function reverseParseSave(file: Uint8Array, data: Data): Uint8Array {
  file = reverseParseParty(file, data.party)
  file = reverseParseBoxes(file, data.boxes)
  return file
}

export default reverseParseSave
