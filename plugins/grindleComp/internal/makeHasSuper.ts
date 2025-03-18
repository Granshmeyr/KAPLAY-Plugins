import type { Comp, GameObj } from "kaplay"
import type { GrindleComp } from "./types"
import type { GrindleUtil } from "../../grindleUtil/index.ts"

export function makeHasSuper<TGameCompId extends GrindleUtil.Enum<string>>() {
    return <TCompMap extends Record<keyof TGameCompId, Comp>>() => {
        return <
            T extends Extract<keyof (TCompMap & GrindleComp.TypeMap), string>,
        >(
            gameObj: GameObj,
            compId: T | T[],
        ): gameObj is GameObj<(TCompMap & GrindleComp.TypeMap)[T]> => {
            if (Array.isArray(compId)) {
                return compId.some((v) => gameObj.has(v))
            }
            return gameObj.has(compId)
        }
    }
}
