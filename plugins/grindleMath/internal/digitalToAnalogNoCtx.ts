import type { KAPLAYCtx } from "kaplay"

export function digitalToAnalogNoCtx(k: KAPLAYCtx) {
    return function digitalToAnalog(direction: {
        up: boolean
        down: boolean
        left: boolean
        right: boolean
    }) {
        const {
            up = false,
            down = false,
            left = false,
            right = false,
        } = direction
        const u = up ? 1 : 0
        const d = down ? 1 : 0
        const l = left ? 1 : 0
        const r = right ? 1 : 0
        return k.vec2(r - l, d - u)
    }
}
