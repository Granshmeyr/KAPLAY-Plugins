import type { KAPLAYCtx, SpriteData } from "kaplay";


export function spritePointNoCtx(k: KAPLAYCtx) {
    return {
        bot(spr: SpriteData) {
            const { width: w, height: h } = spr
            return k.vec2(w / 2, h)
        }
    }
}
