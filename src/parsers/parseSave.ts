import type { Data } from "./types";

function parseSave(save: Uint8Array): Data {
  return {
    party: [],
    boxes: [],
    bag: {},
    player: {
      id: -1,
      name: [],
      rivalName: [],
      money: -1,
      gender: ''
    }
  }
}
export default parseSave
