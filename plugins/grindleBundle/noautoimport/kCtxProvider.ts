import type { KAPLAYCtx } from "kaplay"
import { withCompId } from "./withCompId.ts"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function kCtxProvider(_k: KAPLAYCtx) {
    return {
        withCompId,
    } as const
}
