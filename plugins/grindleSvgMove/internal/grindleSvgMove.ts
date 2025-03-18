import { makePluginFactory } from "./makePluginFactory.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const grindleSvgMove = makePluginFactory("grindleSvgMove")((_k) => {
    return kCtxProvider(_k)
})
