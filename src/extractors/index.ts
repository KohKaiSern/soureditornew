import { writeJSON } from './utils';
import addresses from './addresses';
import apricorns from './apricorns';
import boxThemes from './boxThemes';
import charmap from './charmap';
import items from './items';
import moves from './moves';
import tmhms from './tmhms';
import locations from './locations';
import pokemon from './pokemon';
import version from './version';

for (const [name, obj] of Object.entries({
	addresses,
	apricorns,
	boxThemes,
	charmap,
	items,
	moves,
	tmhms,
	locations,
	pokemon,
	version
})) {
	writeJSON(name, obj);
}
