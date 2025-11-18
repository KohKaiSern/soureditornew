import type { PartyMon } from '$parsers/types';
import addresses from '$data/addresses.json';
import { parsePartyMon } from '$parsers/mon/parseMon';
import { readString } from '$parsers/utils';

function parseParty(file: Uint8Array): PartyMon[] {
  const party = Array(6).fill(null);
  for (let i = 0; i < file[addresses.sBackupPokemonData]; i++) {
    party[i] = parsePartyMon(file, addresses.sBackupPokemonData + 8 + 48 * i);
    party[i].OTNickname = readString(file, addresses.wPartyMonOTs + i * 11, 8, false);
    party[i].nickname = readString(file, addresses.wPartyMonNicknames + i * 11, 11, false);
  }
  return party;
}
export default parseParty;
