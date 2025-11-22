import type { Player } from "$parsers/types";
import addresses from '$data/addresses.json'
import { writeString } from "$parsers/utils";

function reverseParsePlayer(file: Uint8Array, player: Player): Uint8Array {
  file.set([player.id >> 8, player.id & 0xFF], addresses.wPlayerID);
  file = writeString(file, addresses.wPlayerName, 7, false, player.name)
  file = writeString(file, addresses.wRivalName, 7, false, player.rivalName)
  file.set([player.money >> 16, (player.money >> 8) & 0xFF, player.money & 0xFF], addresses.wMoney)
  file[addresses.wPlayerGender] = (player.gender === 'Male' ? 1 : 0)
  return file
}

export default reverseParsePlayer
