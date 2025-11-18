import reverseParseParty from "$parsers/party/reverseParseParty";
import type { Data } from "$parsers/types";

function reverseParseSave(file: Uint8Array, data: Data): Uint8Array {
  file = reverseParseParty(file, data.party)
  return file
}

export default reverseParseSave
