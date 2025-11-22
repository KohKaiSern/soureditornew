import type { Item } from "$parsers/types";
import items from '$data/items.json'
import addresses from "$data/addresses.json";

function parseBag(file: Uint8Array): Record<string, Item[]> {

  const bag: Record<string, Item[]> = {}

  const parseCountedSlot = (address: number): Item[] => {
    const count = file[address]
    const contents: Item[] = [];
    for (let i = 0; i < count; i++) {
      contents[i] = {
        name: items.find((item) => item.index === file[address + 1 + i * 2])!
          .name,
        qty: file[address + 2 + i * 2]
      };
    }
    return contents;
  };

  bag.items = parseCountedSlot(addresses.wNumItems);
  bag.balls = parseCountedSlot(addresses.wNumBalls);
  bag.berries = parseCountedSlot(addresses.wNumBerries);

  bag.keyItems = [];
  const count = file[addresses.wNumKeyItems]
  for (let i = 0; i < count; i++) {
    bag.keyItems.push({
      name: items.find(
        (item) => item.index === file[addresses.wNumKeyItems + 1 + i])!.name,
      qty: 1
    });
  }

  bag.TMsHMs = [];
  for (let i = 0; i < 57; i++) {
    bag.TMsHMs.push({
      name: i > 49 ? `HM0${i - 49}` : `TM${(i + 1).toString().padStart(2, '0')}`,
      qty: file[addresses.wTMsHMs + i]
    });
  }

  bag.coins = [{
    name: 'Game Corner Coins',
    qty: (file[addresses.wCoins] << 8) | file[addresses.wCoins + 1]
  }]

  bag.blueCard = [{
    name: 'Blue Card Points',
    qty: file[addresses.wBlueCardBalance]
  }]

  return bag
}

export default parseBag
