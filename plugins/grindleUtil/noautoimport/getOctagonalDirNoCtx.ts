import type { KAPLAYCtx, Vec2 } from "kaplay"

export function getOctagonalDirNoCtx(k: KAPLAYCtx) {
    return function getOctagonalDir({
        up,
        down,
        left,
        right,
    }: {
        up: boolean
        down: boolean
        left: boolean
        right: boolean
    }): Vec2 {
        const UP_LEFT = k.vec2(-1, -1).unit()
        const UP_RIGHT = k.vec2(1, -1).unit()
        const DOWN_LEFT = k.vec2(-1, 1).unit()
        const DOWN_RIGHT = k.vec2(1, 1).unit()
        if (up) {
            if (down && left && right) return undefined
            if (!down && !left && !right) return k.UP

            if (down && !left && !right) return undefined
            if (!down && left && !right) return UP_LEFT
            if (!down && !left && right) return UP_RIGHT

            if (down && left && !right) return k.LEFT
            if (down && !left && right) return k.RIGHT
            if (!down && left && right) return k.UP
        }
        if (down) {
            if (up && left && right) return undefined
            if (!up && !left && !right) return k.DOWN

            if (up && !left && !right) return undefined
            if (!up && left && !right) return DOWN_LEFT
            if (!up && !left && right) return DOWN_RIGHT

            if (up && left && !right) return k.LEFT
            if (up && !left && right) return k.RIGHT
            if (!up && left && right) return k.DOWN
        }
        if (left) {
            if (up && down && right) return undefined
            if (!up && !down && !right) return k.LEFT

            if (up && !down && !right) return UP_LEFT
            if (!up && down && !right) return DOWN_LEFT
            if (!up && !down && right) return undefined

            if (up && down && !right) return k.LEFT
            if (up && !down && right) return k.UP
            if (!up && down && right) return k.DOWN
        }
        if (right) {
            if (up && down && left) return undefined
            if (!up && !down && !left) return k.RIGHT

            if (up && !down && !left) return UP_RIGHT
            if (!up && down && !left) return DOWN_RIGHT
            if (!up && !down && left) return undefined

            if (up && down && !left) return k.RIGHT
            if (up && !down && left) return k.UP
            if (!up && down && left) return k.DOWN
        }
        return undefined
    }
}
