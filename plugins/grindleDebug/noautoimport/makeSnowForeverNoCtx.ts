import type { KAPLAYCtx, Vec2 } from "kaplay"

export function makeSnowForeverNoCtx(k: KAPLAYCtx) {
    return function makeSnowForever(
        getCenterScreenPos: () => Vec2,
        size: number,
    ): void {
        const SNOW_FADE_DURATION = 0.5
        let time = k.time()
        let lastExecTime = 0
        k.onUpdate(() => {
            time += k.dt()
        })
        k.onDraw(() => {
            if (time - lastExecTime <= 0.5) return
            const centerScreenPos = getCenterScreenPos()
            const snow = k.add([
                k.rect(size, size),
                k.pos(
                    k.vec2(
                        centerScreenPos.x - k.width() / 2 + k.rand(k.width()),
                        centerScreenPos.y - k.height() / 2 + k.rand(k.height()),
                    ),
                ),
                k.animate(),
                k.opacity(0.25),
                k.timer(),
                k.z(-99),
            ])
            let snowLifeTime = 0
            snow.onUpdate(() => {
                snowLifeTime += k.dt()
                if (snowLifeTime > 2) {
                    snow.animate("opacity", [0.4, 0], {
                        duration: SNOW_FADE_DURATION,
                    })
                    snow.wait(SNOW_FADE_DURATION, () => snow.destroy())
                }
            })
            lastExecTime = time
        })
    }
}
