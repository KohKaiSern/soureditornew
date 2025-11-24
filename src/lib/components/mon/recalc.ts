import type { Pokemon } from "$extractors/types";
import type { PartyMon, BoxMon } from "$parsers/types";

function recalc(mon: PartyMon | BoxMon, data: Pokemon): PartyMon | BoxMon {
  if ('currentHP' in mon) {
    const HPDV = (mon.dvs[0] & 1) << 3 | (mon.dvs[1] & 1) << 2 | (mon.dvs[2] & 1) << 1 | (mon.dvs[3] & 1);
    mon.stats[0] = calcStat(data.bsts[0], HPDV, mon.statExps[0], mon.level) + mon.level + 6; //HP
    mon.stats[1] = calcStat(data.bsts[1], mon.dvs[0], mon.statExps[1], mon.level); //ATK
    mon.stats[2] = calcStat(data.bsts[2], mon.dvs[1], mon.statExps[2], mon.level); //DEF
    mon.stats[3] = calcStat(data.bsts[3], mon.dvs[2], mon.statExps[3], mon.level); //SPEED
    mon.stats[4] = calcStat(data.bsts[4], mon.dvs[3], mon.statExps[4], mon.level); //SP. ATK
    mon.stats[5] = calcStat(data.bsts[5], mon.dvs[3], mon.statExps[4], mon.level); //SP. DEF
    mon.currentHP = mon.stats[0]
  }
  // [1]/[2]*n**3 + [3]*n**2 + [4]*n - [5]
  mon.exp = Math.max(0, Math.floor(data.growthCFs[0] / data.growthCFs[1]) * (mon.level ** 3) + data.growthCFs[2] * (mon.level ** 2) + data.growthCFs[3] * mon.level - data.growthCFs[4])
  return mon;
}

function calcStat(bst: number, dv: number, statExp: number, level: number): number {
  return Math.floor(
    ((bst + dv) * 2 + Math.floor(
      (statExp ** 0.5) / 4
    )) * level / 100
  ) + 5;
}

export default recalc;
