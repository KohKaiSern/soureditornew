import { parseRead } from './utils';

const valid_chars = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'-',
	'é',
	"'d",
	"'l",
	"'m",
	"'r",
	"'s",
	"'t",
	"'v",
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	' ',
	'/',
	'(',
	')',
	'¥',
	'<PK>',
	'<MN>',
	'★',
	'♥',
	'♪',
	'?',
	'!',
	'♂',
	'♀',
	'.',
	',',
	':',
	'&',
	'%'
];

function extractCharmap(CHARMAP: string[]): Record<string, string> {
	const charmap: Record<string, string> = {};
	for (let lineNo = 0; lineNo < CHARMAP.length; lineNo++) {
		if (!CHARMAP[lineNo].startsWith('charmap')) continue;
		const char = CHARMAP[lineNo].split('"').at(1)!;
		if (!valid_chars.includes(char)) continue;
		charmap[CHARMAP[lineNo].split('$').at(1)!.slice(0, 2).toUpperCase()] = char;
	}
	return charmap;
}

const CHARMAP = await parseRead('constants/charmap.asm');

const charmap = extractCharmap(CHARMAP);

export default charmap;
