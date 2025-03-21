import type { KAPLAYCtx } from "kaplay"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function kCtxProvider(_k: KAPLAYCtx) {
    return {
        UP_LEFT: _k.vec2(-1, -1).unit(),
        UP_RIGHT: _k.vec2(1, -1).unit(),
        DOWN_LEFT: _k.vec2(-1, 1).unit(),
        DOWN_RIGHT: _k.vec2(1, 1).unit(),
    } as const
}
