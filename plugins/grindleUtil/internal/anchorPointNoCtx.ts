import type { GameObj, PosComp, SpriteComp, AnchorComp, KAPLAYCtx, ScaleComp } from "kaplay"

const anchorPosError = new Error(
    "Object must be attached to scene graph to get relative anchor.",
)

export function anchorPointNoCtx(k: KAPLAYCtx) {
    type Params = Parameters<typeof getBot>

    return {
        bot: (obj: Params[0]) => getBot(obj, false),
        botInWorld: (obj: Params[0]) => getBot(obj, true),
        center: (obj: Params[0]) => getCenter(obj, false),
        centerInWorld: (obj: Params[0]) => getCenter(obj, true),
        topleft: (obj: Params[0]) => getTopleft(obj, false),
        topleftInWorld: (obj: Params[0]) => getTopleft(obj, true),
    }

    function getTopleft(
        obj:
            | GameObj<PosComp | SpriteComp>
            | GameObj<PosComp | SpriteComp | AnchorComp>,
        inWorld?: boolean,
    ) {
        if (!obj.exists()) throw anchorPosError
        const { o, a, w, h, s } = getAnchorPosData(obj)
        const pos = (() => {
            if (a === "center") return o.pos.add(k.vec2(-half(w), -half(h)).scale(s))
            if (a === "top") return o.pos.add(k.vec2(-half(w), 0).scale(s))
            if (a === "bot") return o.pos.add(k.vec2(-half(w), -h).scale(s))
            if (a === "left") return o.pos.add(k.vec2(0, -half(h)).scale(s))
            if (a === "right") return o.pos.add(k.vec2(-w, -half(h)).scale(s))
            if (a === "topleft") return o.pos
            if (a === "topright") return o.pos.add(k.vec2(-w, 0).scale(s))
            if (a === "botleft") return o.pos.add(k.vec2(0, -h).scale(s))
            if (a === "botright") return o.pos.add(k.vec2(-w, -h).scale(s))
        })()
        return inWorld ? pos : obj.fromWorld(pos)
    }

    function getCenter(
        obj:
            | GameObj<PosComp | SpriteComp>
            | GameObj<PosComp | SpriteComp | AnchorComp>,
        inWorld?: boolean,
    ) {
        if (!obj.exists()) throw anchorPosError
        const { o, a, w, h, s } = getAnchorPosData(obj)
        const pos = (() => {
            if (a === "center") return o.pos
            if (a === "top") return o.pos.add(k.vec2(0, half(h)).scale(s))
            if (a === "bot") return o.pos.add(k.vec2(0, -half(h)).scale(s))
            if (a === "left") return o.pos.add(k.vec2(half(w), 0).scale(s))
            if (a === "right") return o.pos.add(k.vec2(-half(w), 0).scale(s))
            if (a === "topleft") return o.pos.add(k.vec2(half(w), half(h)).scale(s))
            if (a === "topright") return o.pos.add(k.vec2(-half(w), half(h)).scale(s))
            if (a === "botleft") return o.pos.add(k.vec2(half(w), -half(h)).scale(s))
            if (a === "botright") return o.pos.add(k.vec2(-half(w), -half(h)).scale(s))
        })()
        return inWorld ? pos : obj.fromWorld(pos)
    }

    function getBot(
        obj:
            | GameObj<PosComp | SpriteComp>
            | GameObj<PosComp | SpriteComp | AnchorComp>,
        inWorld?: boolean,
    ) {
        if (!obj.exists) throw anchorPosError
        const { o, a, w, h, s } = getAnchorPosData(obj)
        const pos = (() => {
            if (a === "center") return o.pos.add(k.vec2(0, half(h)).scale(s))
            if (a === "top") return o.pos.add(k.vec2(0, h).scale(s))
            if (a === "bot") return o.pos
            if (a === "left") return o.pos.add(k.vec2(half(w), half(h)).scale(s))
            if (a === "right") return o.pos.add(k.vec2(-half(w), half(h)).scale(s))
            if (a === "topleft") return o.pos.add(k.vec2(half(w), h).scale(s))
            if (a === "topright") return o.pos.add(k.vec2(-half(w), h).scale(s))
            if (a === "botleft") return o.pos.add(k.vec2(half(w), 0).scale(s))
            if (a === "botright") return o.pos.add(k.vec2(-half(w), 0).scale(s))
        })()
        return inWorld ? pos : obj.fromWorld(pos)
    }

    function getAnchorPosData(
        obj:
            | GameObj<PosComp | SpriteComp>
            | GameObj<PosComp | SpriteComp | AnchorComp>,
    ) {
        return {
            o: obj,
            s: obj.has("scale") ? (obj as unknown as GameObj<ScaleComp>).scale : 1,
            a: obj.has("anchor") ? (obj as GameObj<AnchorComp>).anchor : "topleft",
            w: obj.width,
            h: obj.height,
        }
    }
    function half(num: number): number {
        return 0.5 * num
    }
}
