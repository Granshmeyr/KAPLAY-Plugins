import type { GrindleUtil } from "../../grindleUtil/index.ts"
import type { SpriteConfig } from "./types.d.ts"

export function makeSpriteConfig<N extends GrindleUtil.Enum<string> = never>(
    spriteConfig: SpriteConfig<NoInfer<N>>,
): SpriteConfig<N> {
    return spriteConfig
}
