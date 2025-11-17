import charmap from '$data/charmap.json'

export function readString(file: Uint8Array, address: number, maxLen: number, hasChecksum: boolean): string[] {
  let str = [];
  for (let i = 0; i < maxLen; i++) {
    //Strings including checksums in their MSBs will always have their MSBs set for decoding.
    if (hasChecksum) {
      file[address + i] |= 1 << 7
    }
    //Terminators (0x53 if there's no checksum, 0xFB if there is)
    if (file[address + i] === 0x50 || file[address + i] === 0xC6) break;
    //Space (0x7F if there's no checksum, 0xFA if there is)
    if (file[address + i] === 0x7F || file[address + i] === 0xC7) {
      str.push(' ');
      continue;
    }
    //Zero (0x00 if there's no checksum, 0xFC if there is)
    if (file[address + i] === 0 || file[address + i] === 0xC8) {
      str.push('0')
      continue;
    }
    str.push(charmap[file[address + i].toString(16).toUpperCase() as keyof typeof charmap]);
  }
  return str;
};
