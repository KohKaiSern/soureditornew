import type { Mon, PartyMon } from './types';
import pokemon from '$data/pokemon.json';
import items from '$data/items.json';
import moves from '$data/moves.json';
import locations from '$data/locations.json';

// export function parseMon(file: Uint8Array, address: number): Mon {
//
// }

export function parsePartyMon(
	file: Uint8Array,
	address: number
): Omit<PartyMon, 'nickname' | 'OTNickname'> {
	return {
		species: species(file, address),
		heldItem: heldItem(file, address + 1),
		moveset: moveset(file, address + 2),
		OTID: OTID(file, address + 6),
		exp: exp(file, address + 8),
		statExps: statExps(file, address + 11),
		dvs: dvs(file, address + 21),
		PPUPs: PartyPPUPs(file, address + 23),
		powerPoints: powerPoints(file, address + 23),
		happiness: happiness(file, address + 27),
		pokerus: pokerus(file, address + 28),
		caughtTime: caughtTime(file, address + 29),
		caughtLevel: caughtLevel(file, address + 29),
		OTGender: OTGender(file, address + 30),
		caughtLocation: caughtLocation(file, address + 30),
		level: level(file, address + 31),
		status: status(file, address + 32),
		currentHP: currentHP(file, address + 34),
		stats: stats(file, address + 36)
	};
}

const species = (file: Uint8Array, address: number): string =>
	pokemon.find((p) => p.index === file[address])!.name;

const heldItem = (file: Uint8Array, address: number): string =>
	items.find((i) => i.index === file[address])!.name;

const moveset = (file: Uint8Array, address: number): string[] =>
	Array.from({ length: 4 }, (_, i) => moves.find((m) => m.index === file[address + i])!.name);

const OTID = (file: Uint8Array, address: number): number =>
	(file[address] << 8) | file[address + 1];

const exp = (file: Uint8Array, address: number): number =>
	(file[address] << 16) | (file[address + 1] << 8) | file[address + 2];

const statExps = (file: Uint8Array, address: number): number[] =>
	Array.from({ length: 5 }, (_, i) => (file[address + i * 2] << 8) | file[address + i * 2 + 1]);

const dvs = (file: Uint8Array, address: number): number[] =>
	Array.from(
		{ length: 4 },
		(_, i) => (file[address + Math.floor(i / 2)] >> (4 * (1 - (i % 2)))) & 0xf
	);

const PartyPPUPs = (file: Uint8Array, address: number): number[] =>
	Array.from({ length: 4 }, (_, i) => file[address + i] >> 5);

const powerPoints = (file: Uint8Array, address: number): number[] =>
	Array.from({ length: 4 }, (_, i) => file[address + i] & 0x3f);

const happiness = (file: Uint8Array, address: number): number => file[address];

const pokerus = (
	file: Uint8Array,
	address: number
):
	| 'NONE'
	| {
			strain: number;
			daysRemaining: number | 'CURED';
	  } => {
	if (file[address] >> 4 === 0) return 'NONE';
	return {
		strain: file[address] & 0xf0,
		daysRemaining: (file[address] & 0xf) === 0 ? 'CURED' : file[address] & 0xf
	};
};

const caughtTime = (file: Uint8Array, address: number): string =>
	['MORNING', 'DAY', 'NIGHT', 'EVENING'].at(file[address] >> 6)!;

const caughtLevel = (file: Uint8Array, address: number): number => file[address] & 0x3f;

const OTGender = (file: Uint8Array, address: number): 'MALE' | 'FEMALE' =>
	file[address] >> 7 === 0 ? 'MALE' : 'FEMALE';

const caughtLocation = (file: Uint8Array, address: number): string =>
	locations.find((l) => l.index === (file[address] & 0x7f))!.name;

const level = (file: Uint8Array, address: number): number => file[address];

const status = (
	file: Uint8Array,
	address: number
): {
	name: string;
	turnsRemaining?: number;
} => {
	if (file[address] === 0) return { name: 'NONE' };
	const name = [
		'SLEEP',
		'SLEEP',
		'SLEEP',
		'POISON',
		'BURN',
		'FREEZE',
		'PARALYSIS',
		'BADLY POISONED'
	].at(Math.floor(Math.log2(file[address])))!;
	if (name === 'SLEEP') {
		return {
			name,
			turnsRemaining: file[address] & 0x7
		};
	} else {
		return {
			name
		};
	}
};

const currentHP = (file: Uint8Array, address: number): number =>
	(file[address] << 8) | file[address + 1];

const stats = (file: Uint8Array, address: number): number[] =>
	Array.from({ length: 6 }, (_, i) => (file[address + 2 * i] << 8) | file[address + 2 * i + 1]);
