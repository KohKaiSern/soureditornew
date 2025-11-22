import addresses from '$data/addresses.json'

function checksum(file: Uint8Array): Uint8Array {
  let sum = 0;
  //Calculate the 16-bit sum of all bytes in the backup game data region
  for (
    let address = addresses.sBackupGameData;
    address < addresses.sBackupGameDataEnd;
    address++
  ) {
    sum += file[address];
  }
  // Keep only the lower 16 bits
  sum = sum & 0xffff;
  //Write to both checksums in little-endian format
  file.set([sum & 0xFF, sum >> 8], addresses.sChecksum)
  file.set([sum & 0xFF, sum >> 8], addresses.sBackupChecksum)

  return file
}

export default checksum
