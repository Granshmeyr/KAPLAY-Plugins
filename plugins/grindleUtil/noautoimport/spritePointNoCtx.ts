import type { KAPLAYCtx, SpriteData, Vec2 } from "kaplay"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function spritePointNoCtx(k: KAPLAYCtx) {
    return {
        bot(spr: SpriteData): Vec2 {
            const { width: w, height: h } = spr
            return k.vec2(w / 2, h)
        },
    }
}
