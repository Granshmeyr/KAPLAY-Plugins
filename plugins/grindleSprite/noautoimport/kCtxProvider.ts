import { makeLoadAsepriteFromConfigNoCtx } from "./makeLoadAsepriteFromConfigNoCtx.ts"
import { makeSpriteAnimFactory } from "./makeSpriteAnimFactory.ts"
import { makeSpriteConfig } from "./makeSpriteConfig.ts"
import type { KAPLAYCtx } from "kaplay"

export const kCtxProvider = (_k: KAPLAYCtx) =>
    ({
        makeLoadAsepriteFromConfig: makeLoadAsepriteFromConfigNoCtx(_k),
        makeSpriteAnimFactory,
        makeSpriteConfig,
    } as const)
