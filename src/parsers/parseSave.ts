import type { Data, PartyMon, Box, Item, Player } from '$parsers/types';
import parseParty from '$parsers/party/parseParty';
import parseBoxes from '$parsers/boxes/forward/parseBoxes';
import parseBag from '$parsers/bag/parseBag'
import parsePlayer from '$parsers/player/parsePlayer';

function parseSave(file: Uint8Array): Data {
  const party: PartyMon[] = parseParty(file);
  const boxes: Box[] = parseBoxes(file);
  const bag: Record<string, Item[]> = parseBag(file);
  const player: Player = parsePlayer(file);
  return {
    party,
    boxes,
    bag,
    player
  };
}
export default parseSave;
