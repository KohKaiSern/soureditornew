import items from "./items"
import { parseRead } from "./utils"

function extractBalls(apricorns: Record<string, string>, APRICORNS: string[]): Record<string, string> {
  for (const line of APRICORNS) {
    if (line.startsWith('db')) {
      const match = line.match(/[A-Z_]+/g)!
      if (!match) continue;
      apricorns[items.find(i => i.id === match.at(0)!)!.name]
        = items.find(i => i.id === match.at(1)!)!.name
    }
  }
  return apricorns
}

const APRICORNS = await parseRead('data/items/apricorn_balls.asm')
let apricorns: Record<string, string> = {}
apricorns = extractBalls(apricorns, APRICORNS)

export default apricorns
