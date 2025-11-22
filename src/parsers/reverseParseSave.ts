import reverseParseParty from "$parsers/party/reverseParseParty";
import reverseParseBoxes from "$parsers/boxes/reverse/reverseParseBoxes";
import reverseParseBag from '$parsers/bag/reverseParseBag'
import type { Data } from "$parsers/types";

function reverseParseSave(file: Uint8Array, data: Data): Uint8Array {
  file = reverseParseParty(file, data.party)
  file = reverseParseBoxes(file, data.boxes)
  file = reverseParseBag(file, data.bag)
  return file
}

export default reverseParseSave
