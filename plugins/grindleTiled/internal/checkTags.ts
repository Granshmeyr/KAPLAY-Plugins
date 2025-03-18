import type { LayerTag } from "./types"

export function checkTags(
    name: string,
    tags: LayerTag[],
): Record<LayerTag, boolean> {
    const match = name.match(RegExp(/\[([^\]]+)\]/))
    const extractedSubstrs = match
        ? match[1].split(",").map((s) => s.trim().toLowerCase())
        : undefined
    return tags.reduce<Record<string, boolean>>(
        match
            ? (acc, substr) => {
                  acc[substr] = extractedSubstrs.includes(substr.toLowerCase())
                  return acc
              }
            : (acc, substr) => {
                  acc[substr] = false
                  return acc
              },
        {},
    )
}
