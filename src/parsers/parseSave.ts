import type { Data, PartyMon, Box, Item } from './types';
import parseParty from '$parsers/party/parseParty';
import parseBoxes from '$parsers/boxes/forward/parseBoxes';
import parseBag from '$parsers/bag/parseBag'

function parseSave(file: Uint8Array): Data {
  const party: PartyMon[] = parseParty(file);
  const boxes: Box[] = parseBoxes(file);
  const bag: Record<string, Item[]> = parseBag(file);
  return {
    party,
    boxes,
    bag,
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
