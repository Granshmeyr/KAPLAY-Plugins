import { makePluginFactory } from "./makePluginFactory.js"
import { kCtxProvider } from "./kCtxProvider.js"

export const grindleSvgMove = makePluginFactory("grindleSvgMove")((_k) => {
    return kCtxProvider(_k)
})
