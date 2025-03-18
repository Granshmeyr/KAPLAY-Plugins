import type { GrindleUtil } from "../../grindleUtil/index.ts"
import type { SpriteConfig } from "./types"
import type { PluggedK } from "./types"

const IMG_EXT = ".webp"
export function makeLoadAsepriteFromConfigNoCtx(k: PluggedK) {
    return function makeLoadAsepriteFromConfig<
        TName extends GrindleUtil.Enum<string>,
    >(config: SpriteConfig<TName>) {
        return (name: keyof NoInfer<TName> | (keyof NoInfer<TName>)[]) =>
            loadAsepriteFromConfig(config, name)
    }

    function loadAsepriteFromConfig<TName extends GrindleUtil.Enum<string>>(
        config: SpriteConfig<TName>,
        name: keyof NoInfer<TName> | (keyof NoInfer<TName>)[],
    ): Promise<void> {
        const key = name as string | string[]
        if (key == null) throw new Error("Sprite name is undefined")
        return new Promise((resolve) => {
            if (!Array.isArray(key)) {
                if (k.getAsset(key)) {
                    resolve()
                    return
                }
                const { fileName, path } = config[key]
                k.loadAseprite(
                    key,
                    `${path}/.${fileName}/${fileName}${IMG_EXT}`,
                    `${path}/.${fileName}/${fileName}.json`,
                )
                    .onLoad(() => {
                        resolve()
                    })
                    .onError(() => {
                        throw new Error(
                            `Failed to load sprite file ${fileName} from ${path}/.${fileName}`,
                        )
                    })
                return
            }

            const loaded: boolean[] = new Array(key.length).fill(false)
            for (const [i, v] of key.entries()) {
                if (k.getAsset(v)) {
                    loaded[i] = true
                    if (loaded.every(Boolean)) {
                        resolve()
                        return
                    }
                    continue
                }
                const { fileName, path } = config[v]
                k.loadAseprite(
                    v,
                    `${path}/.${fileName}/${fileName}${IMG_EXT}`,
                    `${path}/.${fileName}/${fileName}.json`,
                )
                    .onLoad(() => {
                        loaded[i] = true
                        if (loaded.every(Boolean)) {
                            resolve()
                            return
                        }
                    })
                    .onError(() => {
                        throw new Error(
                            `Failed to load sprite file ${fileName} from ${path}/.${fileName}`,
                        )
                    })
            }
        })
    }
}
