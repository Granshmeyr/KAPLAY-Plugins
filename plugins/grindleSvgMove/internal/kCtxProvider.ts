import type { KAPLAYCtx } from "kaplay"
import { makePathFactoryNoCtx } from "./makePathFactoryNoCtx.ts"
import { makePathControllerNoCtx } from "./makePathControllerNoCtx.ts"

export function kCtxProvider(k: KAPLAYCtx) {
    const svgPath = {
        straight: "M125,100L125,150",
        wave: "M125,100C125,100 142.98,102.616 148.08,119.578C153.181,136.54 99.329,107.058 106.564,127.763C113.8,148.467 125,150 125,150",
    } as const
    const makePathFactory = makePathFactoryNoCtx(k)

    return {
        factory: {
            straight: makePathFactory(svgPath.straight),
            wave: makePathFactory(svgPath.wave),
        },
        makePathController: makePathControllerNoCtx(k),
        makePathFactory,
    } as const
}
