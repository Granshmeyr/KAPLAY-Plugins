import type { LayerTag } from "./types.d.ts"
import { checkTags } from "./checkTags.ts"

export function hasTags(
    name: string,
    tags: LayerTag[],
    op?: "and" | "or",
): boolean {
    op = op ?? "and"
    return op === "and"
        ? Object.values(checkTags(name, tags)).every(Boolean)
        : Object.values(checkTags(name, tags)).some(Boolean)
}
