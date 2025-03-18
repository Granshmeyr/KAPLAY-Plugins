import type { KAPLAYCtx } from "kaplay"

export function kCtxProvider(k: KAPLAYCtx) {
    return {
        UP_LEFT: k.vec2(-1, -1).unit(),
        UP_RIGHT: k.vec2(1, -1).unit(),
        DOWN_LEFT: k.vec2(-1, 1).unit(),
        DOWN_RIGHT: k.vec2(1, 1).unit(),
    } as const
}
