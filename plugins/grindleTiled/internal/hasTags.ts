import type { LayerTag } from "./types"
import { checkTags } from "./checkTags.ts"

export function hasTags(name: string, tags: LayerTag[], op?: "and" | "or") {
    op = op ?? "and"
    return op === "and"
        ? Object.values(checkTags(name, tags)).every(Boolean)
        : Object.values(checkTags(name, tags)).some(Boolean)
}
