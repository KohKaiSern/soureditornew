import type { PartyMon } from "$parsers/types";
import pokemon from '$data/pokemon.json'
import items from '$data/items.json'
import moves from '$data/moves.json'
import locations from '$data/locations.json'

export function reverseParsePartyMon(file: Uint8Array, address: number, mon: PartyMon): Uint8Array {
  file = species(file, address, mon.species)
  file = heldItem(file, address + 1, mon.heldItem)
  file = moveset(file, address + 2, mon.moveset)
  file = OTID(file, address + 6, mon.OTID)
  file = exp(file, address + 8, mon.exp)
  file = statExps(file, address + 11, mon.statExps)
  file = dvs(file, address + 21, mon.dvs)
  file = PartyPPUPs(file, address + 23, mon.PPUPs)
  file = powerPoints(file, address + 23, mon.powerPoints)
  file = happiness(file, address + 27, mon.happiness)
  file = pokerus(file, address + 28, mon.pokerus)
  file = caughtTime(file, address + 29, mon.caughtTime)
  file = caughtLevel(file, address + 29, mon.caughtLevel)
  file = OTGender(file, address + 30, mon.OTGender)
  file = caughtLocation(file, address + 30, mon.caughtLocation)
  file = level(file, address + 31, mon.level)
  file = status(file, address + 32, mon.status)
  file = currentHP(file, address + 34, mon.currentHP)
  file = stats(file, address + 36, mon.stats)
  return file
}

const species = (file: Uint8Array, address: number, species: string): Uint8Array =>
  (file[address] = pokemon.find(p => p.name === species)!.index, file)

const heldItem = (file: Uint8Array, address: number, heldItem: string): Uint8Array =>
  (file[address] = items.find(i => i.name === heldItem)!.index, file)

const moveset = (file: Uint8Array, address: number, moveset: string[]): Uint8Array =>
  (file.set(moveset.map(move => moves.find(m => m.name === move)!.index), address), file);

const OTID = (file: Uint8Array, address: number, OTID: number): Uint8Array =>
  (file.set([OTID >> 8, OTID & 0xFF], address), file);

const exp = (file: Uint8Array, address: number, exp: number): Uint8Array =>
  (file.set([exp >> 16, (exp >> 8) & 0xFF, exp & 0xFF], address), file)

const statExps = (file: Uint8Array, address: number, statExps: number[]): Uint8Array =>
  (file.set(statExps.flatMap(s => [s >> 8, s & 0xFF]), address), file)

const dvs = (file: Uint8Array, address: number, dvs: number[]): Uint8Array =>
  (file.set([dvs[0] << 4 | dvs[1], dvs[2] << 4 | dvs[3]], address), file)

const PartyPPUPs = (file: Uint8Array, address: number, PPUPs: number[]): Uint8Array => {
  for (let i = 0; i < 4; i++) {
    file[address + i] = (PPUPs[i] << 6) | (file[address + i] & 0x3F)
  }
  return file
}

const powerPoints = (file: Uint8Array, address: number, powerPoints: number[]): Uint8Array => {
  for (let i = 0; i < 4; i++) {
    file[address + i] = (file[address + i] & 0xC0) | powerPoints[i]
  }
  return file
}

const happiness = (file: Uint8Array, address: number, happiness: number): Uint8Array =>
  (file[address] = happiness, file)

const pokerus = (file: Uint8Array, address: number, pokerus: 'NONE' | { strain: number, daysRemaining: number | 'CURED' }): Uint8Array => {
  if (pokerus === 'NONE') {
    file[address] = 0
  } else {
    if (pokerus.daysRemaining === 'CURED') {
      file[address] = pokerus.strain << 4 | 0
    } else {
      file[address] = pokerus.strain << 4 | pokerus.daysRemaining
    }
  }
  return file
}

const caughtTime = (file: Uint8Array, address: number, caughtTime: string): Uint8Array => {
  const value = ['MORNING', 'DAY', 'NIGHT', 'EVENING'].findIndex(t => t === caughtTime);
  file[address] = value << 6 | (file[address] & 0x3F)
  return file
}

const caughtLevel = (file: Uint8Array, address: number, caughtLevel: number): Uint8Array =>
  (file[address] = (file[address] & 0xC0) | caughtLevel, file)

const OTGender = (file: Uint8Array, address: number, OTGender: 'MALE' | 'FEMALE'): Uint8Array => {
  const value = OTGender === 'MALE' ? 0 : 1;
  file[address] = (value << 7) | (file[address] & 0x7F);
  return file
}

const caughtLocation = (file: Uint8Array, address: number, caughtLocation: string): Uint8Array => {
  const value = locations.find(l => l.name === caughtLocation)!.index
  file[address] = (file[address] & 0x80) | value;
  return file
}

const level = (file: Uint8Array, address: number, level: number): Uint8Array =>
  (file[address] = level, file);

const status = (file: Uint8Array, address: number, status: { name: string, turnsRemaining?: number }): Uint8Array => {
  if (status.name === 'NONE') {
    file[address] = 0
  } else if (status.name === 'SLEEP') {
    file[address] = status.turnsRemaining!
  } else {
    file[address] = 2 ** [null, null, null, 'POISON', 'BURN', 'FREEZE', 'PARALYSIS', 'BADLY POISONED'].findIndex(s => s === status.name)
  }
  return file
}

const currentHP = (file: Uint8Array, address: number, currentHP: number): Uint8Array =>
  (file.set([currentHP >> 8, currentHP & 0xFF], address), file)

const stats = (file: Uint8Array, address: number, stats: number[]): Uint8Array =>
  (file.set(stats.flatMap(s => [s >> 8, s & 0xFF]), address), file)
