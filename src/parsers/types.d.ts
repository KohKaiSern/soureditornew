export interface Mon {
  species: string;
  heldItem: string;
  moves: string[];
  OTID: number;
  exp: number;
  statExps: number[];
  dvs: number[];
  isEgg: boolean;
  PPUPs: number[];
  happiness: number;
  pokerus: {
    strain: number | 'None' | 'Cured';
    daysRemaining: number;
  };
  level: number;
  caughtTime: string;
  caughtLevel: number;
  OTGender: 'Male' | 'Female';
  caughtLocation: string;
  nickname: string[];
  OTNickname: string[];
}

export interface PartyMon extends Mon {
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
