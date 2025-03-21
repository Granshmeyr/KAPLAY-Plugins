import type { Tiled } from "./types.d.ts"

export const layerUtil = {
    isObjectLayer(layer: Tiled.Layer): layer is Tiled.ObjectLayer {
        return layer.type === "objectgroup"
    },
    isTileLayer(layer: Tiled.Layer): layer is Tiled.TileLayer {
        return layer.type === "tilelayer"
    },
} as const
