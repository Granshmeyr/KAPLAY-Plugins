import type { PluggedK } from "./types"
import { makeLoadAsepriteFromConfigNoCtx } from "./makeLoadAsepriteFromConfigNoCtx.ts"
import { makeSpriteAnimFactory } from "./makeSpriteAnimFactory.ts"
import { makeSpriteConfig } from "./makeSpriteConfig.ts"

export function kCtxProvider(k: PluggedK) {
    return {
        makeLoadAsepriteFromConfig: makeLoadAsepriteFromConfigNoCtx(k),
        makeSpriteAnimFactory,
        makeSpriteConfig,
    } as const
}
