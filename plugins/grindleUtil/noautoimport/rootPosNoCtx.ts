import type { GameObj, KAPLAYCtx, PosComp, ScaleComp, Vec2 } from "kaplay"

export function rootPosNoCtx(k: KAPLAYCtx) {
    return function rootPos(obj: GameObj<PosComp>): Vec2 {
        const objs = getObjsInTree(obj)
        const pos = getDescendantPosInRoot(objs)
        return pos
    }

    function getObjsInTree(
        obj: GameObj<unknown>,
        coll: TreeObj[] = []
    ): TreeObj[] {
        coll.push(obj)
        const p = obj.parent
        if (!p) return coll
        return getObjsInTree(p, coll)
    }

    function getDescendantPosInRoot(objs: TreeObj[]): Vec2 {
        const posVals: Vec2[] = objs.reduce<Vec2[]>((acc, obj, i) => {
            if (obj.has("pos") && "pos" in obj) acc.push(obj.pos)
            else acc.push(k.vec2())

            if (obj.has("scale") && "scale" in obj) {
                for (const [index, v] of acc.entries()) {
                    if (index >= i) break
                    v.scale(obj.scale)
                }
            }

            return acc
        }, [])

        return posVals.reduce<Vec2>((acc, v) => acc.add(v), k.vec2())
    }

    type TreeObj = GameObj<null> | GameObj<PosComp> | GameObj<PosComp | ScaleComp>
}
