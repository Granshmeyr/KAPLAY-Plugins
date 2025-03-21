import type { Tiled } from "./types.d.ts"

export const objUtil = {
    isEllipse(obj: Tiled.Obj): obj is Tiled.Ellipse {
        return (
            "ellipse" in obj && obj.ellipse === true && obj.width === obj.height
        )
    },
    isPolygon(obj: Tiled.Obj): obj is Tiled.Polygon {
        return "polygon" in obj && Array.isArray(obj.polygon)
    },
    isPoint(obj: Tiled.Obj): obj is Tiled.Point {
        return "point" in obj && obj.point
    },
    isTile(obj: Tiled.Obj): obj is Tiled.Tile {
        return "gid" in obj
    },
}
