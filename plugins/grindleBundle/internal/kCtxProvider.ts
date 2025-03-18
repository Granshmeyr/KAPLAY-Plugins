import { withCompId } from "./withCompId.ts"

export function kCtxProvider() {
    return {
        withCompId,
    } as const
}
