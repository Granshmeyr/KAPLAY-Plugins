import type { KAPLAYCtx, Vec2 } from "kaplay"
import { deepFreeze } from "./deepFreeze.ts"
import { objFromEnum } from "./objFromEnum.ts"
import { resolveObjPromises } from "./resolveObjPromises.ts"
import { use } from "./use.ts"
import { getOctagonalDirNoCtx } from "./getOctagonalDirNoCtx.ts"
import { makeEvents } from "./makeEvents.ts"
import { makeStringEnum } from "./makeStringEnum.ts"
import { anchorPointNoCtx } from "./anchorPointNoCtx.ts"
import { HistoryArray } from "./HistoryArray.ts"
import { spritePointNoCtx } from "./spritePointNoCtx.ts"
import { scaleAroundNoCtx } from "./scaleAroundNoCtx.ts"
import { RotateAroundControllerNoCtx } from "./RotateAroundControllerNoCtx.ts"
import { rootPosNoCtx } from "./rootPosNoCtx.ts"

export function kCtxProvider(k: KAPLAYCtx) {
    const rootPos = rootPosNoCtx(k)
    type RooPosParams = Parameters<typeof rootPos>

    type RotAroParams = ConstructorParameters<typeof RotateAroundControllerNoCtx>
    class RotateAroundController extends RotateAroundControllerNoCtx {
        constructor(
            obj: RotAroParams[1],
            onGetOrigin: RotAroParams[2]
        ) {
            super(k, obj, onGetOrigin)
        }
    }

    return {
        deepFreeze,
        objFromEnum,
        resolveObjPromises,
        use,
        getOctagonalDir: getOctagonalDirNoCtx(k),
        makeEvents,
        makeStringEnum,
        anchorPoint: anchorPointNoCtx(k),
        spritePoint: spritePointNoCtx(k),
        HistoryArray,
        RotateAroundController,
        scaleAround: scaleAroundNoCtx(k),
        rootPos,
        toRoot: (obj: RooPosParams[0], offset: Vec2) => rootPos(obj).add(offset)
    } as const
}
