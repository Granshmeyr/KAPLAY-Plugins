import type { GameObj, Comp } from "kaplay"

export function use(obj: GameObj, comps: Comp[]): void {
    for (const c of comps) {
        obj.use(c)
    }
}
