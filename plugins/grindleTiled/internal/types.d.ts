/* eslint-disable filename-export/match-named-export */
import type {
    PosComp,
    AreaComp,
    BodyComp,
    SpriteComp,
    Comp,
    GameObj,
    Vec2,
} from "kaplay"

export namespace GrindleTiled {
    export type AreaData = ObjData<PosComp | AreaComp>
    export type CollisionData = ObjData<PosComp | AreaComp | BodyComp>
    export type LayerData = ObjData<PosComp | SpriteComp>
    export type ObjData<T extends Comp> = {
        name: string
        props: Property[]
        obj: GameObj<T>
    }
    export type PointData = Omit<ObjData<undefined>, "obj"> & {
        pos: Vec2
    }
    export type Property<
        TValue extends number | boolean | string = number | boolean | string,
    > = {
        name: string
        type: TValue extends string
            ? "string"
            : TValue extends boolean
              ? "bool"
              : "float" | "int"
        value: TValue
    }
    export type TileData = ObjData<PosComp | SpriteComp>
    export type TiledData = {
        objs: GameObj[]
        layerData: LayerData[]
        tileData: TileData[]
        areaData: AreaData[]
        colData: CollisionData[]
        pointData: PointData[]
    }
}

export namespace Tiled {
    export type Obj = Rectangle | Ellipse | Polygon | Point | Tile
    export type AreaObj = Omit<Obj, "point">
    export type Tmj = {
        compressionLevel: number
        height: number
        infinite: boolean
        layers: (TileLayer | ObjectLayer)[]
        nextlayerid: number
        nextobjectid: number
        orientation: string
        renderorder: string
        tiledversion: string
        tileheight: number
        tilesets: {
            firstgid: number
            source: string
        }[]
        tilewidth: number
        type: string
        version: string
        width: number
    }
    export type Tsj = {
        columns: number
        margin: number
        name: string
        spacing: number
        tilecount: number
        tiledversion: string
        tileheight: number
        tilewidth: number
        type: "tileset"
        version: string
    }
    export type Layer = TileLayer | ObjectLayer
    export type BaseLayer<TType extends string> = {
        name: string
        opacity: number
        x: number
        y: number
        visible: boolean
        id: number
        type: TType
        properties?: GrindleTiled.Property[]
    }
    export type TileLayer = BaseLayer<"tilelayer"> & {
        width: number
        height: number
        data: number[]
    }
    export type ObjectLayer = BaseLayer<"objectgroup"> & {
        draworder: string
        objects: Obj[]
    }
    export type Rectangle = {
        height: number
        id: number
        name: string
        rotation: number
        type: string
        visible: boolean
        width: number
        x: number
        y: number
        properties?: GrindleTiled.Property[]
    }
    export type Ellipse = Rectangle & {
        ellipse: true
    }
    export type Polygon = Rectangle & {
        polygon: { x: number; y: number }[]
    }
    export type Point = Rectangle & {
        point: true
    }
    export type Tile = Rectangle & {
        gid: number
    }
    export type TileSheet = Tsj & {
        image: string
        imageheight: number
        imagewidth: number
    }
    export type ImageCollection = Tsj & {
        fillmode: string
        grid: {
            height: number
            orientation: string
            width: 8
        }
        tiles: TileAsset[]
        transformations: {
            hflip: boolean
            preferuntransformed: boolean
            rotate: boolean
            vflip: boolean
        }
    }
    export type TileAsset = {
        id: number
        image: string
        imageheight: number
        imagewidth: number
    }
    export type OutJson = {
        layers: { id: number; ext: ".jpg" | ".webp" | ".png" }[]
        tiles: { gid: number; ext: ".jpg" | ".webp" | ".png" }[]
    }
}

export type LayerTag = ObjectLayerTag
type ObjectLayerTag = "rasterize" | "collision"

export type MapOpt = {
    file: string
    origin?: Vec2
    pixelScale?: number
    spriteScale?: number
    disableCol?: boolean
}
