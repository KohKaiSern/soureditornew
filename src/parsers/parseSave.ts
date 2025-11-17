import type { Data, PartyMon } from "./types";
import parseParty from "./party/forward/parseParty";

function parseSave(file: Uint8Array): Data {
  const party: PartyMon[] = parseParty(file)
  return {
    party,
    boxes: [],
    bag: {},
    player: {
      id: -1,
      name: [],
      rivalName: [],
      money: -1,
      gender: ''
    }
  }
}
export default parseSave
