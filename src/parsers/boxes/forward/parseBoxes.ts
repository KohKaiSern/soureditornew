import type { Box } from "$parsers/types";
import parseBoxNames from '$parsers/boxes/forward/parseBoxNames'
import parseBoxThemes from '$parsers/boxes/forward/parseBoxThemes'
import parseBoxAddresses from '$parsers/boxes/forward/parseBoxAddresses'
import { parseBoxMon } from "$parsers/mon/parseMon";

function parseBoxes(file: Uint8Array): Box[] {
  const names = parseBoxNames(file);
  const themes = parseBoxThemes(file);
  const addresses = parseBoxAddresses(file);
  const mons = Array(16)
    .fill(null)
    .map(() => Array(20).fill(null));
  for (let box = 0; box < 16; box++) {
    for (let i = 0; i < 20; i++) {
      if (!addresses[box][i]) continue;
      mons[box][i] = parseBoxMon(file, addresses[box][i]);
    }
  }
  const boxes: Box[] = [];
  for (let box = 0; box < 16; box++) {
    boxes.push({
      name: names[box],
      theme: themes[box],
      mons: mons[box]
    });
  }
  return boxes;
}

export default parseBoxes
