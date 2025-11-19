import type { Data, PartyMon, Box } from './types';
import parseParty from '$parsers/party/parseParty';
import parseBoxes from '$parsers/boxes/forward/parseBoxes';

function parseSave(file: Uint8Array): Data {
  const party: PartyMon[] = parseParty(file);
  const boxes: Box[] = parseBoxes(file);
  return {
    party,
    boxes,
    bag: {},
    player: {
      id: -1,
      name: [],
      rivalName: [],
      money: -1,
      gender: ''
    }
  };
}
export default parseSave;
