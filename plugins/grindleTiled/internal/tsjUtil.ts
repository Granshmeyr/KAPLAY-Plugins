import type { Tiled } from "./types"

export const tsjUtil = {
    isImageCollection(tsj: Tiled.Tsj): tsj is Tiled.ImageCollection {
        return "tiles" in tsj
    },
    isTileSheet(tsj: Tiled.Tsj): tsj is Tiled.TileSheet {
        return "image" in tsj
    },
}
