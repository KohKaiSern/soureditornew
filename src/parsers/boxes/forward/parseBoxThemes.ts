import boxThemes from "$data/boxThemes.json";
import addresses from '$data/addresses.json';

function parseBoxThemes(file: Uint8Array): string[] {
  const themes: string[] = [];
  for (let box = 0; box < 16; box++) {
    themes.push(boxThemes.find(b => b.index === file[addresses.sBackupNewBox1 + 33 * box + 32])!.name);
  }
  return themes;
}

export default parseBoxThemes
