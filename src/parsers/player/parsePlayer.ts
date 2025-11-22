import type { Player } from "$parsers/types";
import addresses from '$data/addresses.json'
import { readString } from "$parsers/utils";

function parsePlayer(file: Uint8Array): Player {
  return {
    id: (file[addresses.wPlayerID] << 8) | file[addresses.wPlayerID + 1],
    name: readString(file, addresses.wPlayerName, 7, false),
    rivalName: readString(file, addresses.wRivalName, 7, false),
    money: (file[addresses.wMoney] << 16) | (file[addresses.wMoney + 1] << 8) | file[addresses.wMoney + 2],
    gender: file[addresses.wPlayerGender] === 1 ? 'Male' : 'Female'
  }
}

export default parsePlayer
