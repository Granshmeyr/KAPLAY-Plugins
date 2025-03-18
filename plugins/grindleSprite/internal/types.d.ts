/* eslint-disable filename-export/match-named-export */
import type { KAPLAYCtx } from "kaplay"
import type { GrindleUtil } from "../../grindleUtil/index.ts"
import type { grindleUtil } from "../../grindleUtil/index.ts"

export type SpriteConfig<N extends GrindleUtil.Enum<string>> = {
    [K in keyof N]: {
        fileName: string
        path: string
    }
}

export type PluggedK = KAPLAYCtx & ReturnType<typeof grindleUtil>
