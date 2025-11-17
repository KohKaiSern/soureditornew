export interface Mon {
  species: string;
  heldItem: string;
  moveset: string[];
  OTID: number;
  exp: number;
  statExps: number[];
  dvs: number[];
  PPUPs: number[];
  happiness: number;
  pokerus: 'NONE' | {
    strain: number;
    daysRemaining: number | 'CURED'
  }
  caughtTime: string;
  caughtLevel: number;
  OTGender: 'MALE' | 'FEMALE';
  caughtLocation: string;
  level: number;
  isEgg: boolean
  nickname: string[];
  OTNickname: string[];
}

export interface PartyMon extends Omit<Mon, 'isEgg'> {
  currentHP: number;
  stats: number[];
  status: {
    name: string;
    turnsRemaining?: number;
  };
  powerPoints: number[];
}

export interface Box {
  name: string[];
  theme: string;
  mons: (Mon | null)[];
}

export interface Item {
  name: string;
  qty: number;
}

export interface BagSlot {
  count?: number;
  contents: Item[];
}

export interface Player {
  id: number;
  name: string[];
  rivalName: string[];
  money: number;
  gender: string;
}

export interface Data {
  party: PartyMon[];
  boxes: Box[];
  bag: Record<string, BagSlot>;
  player: Player
}
