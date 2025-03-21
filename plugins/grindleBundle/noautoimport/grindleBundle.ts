import { kCtxProvider } from "./kCtxProvider.ts"
import { makePluginFactory } from "./makePluginFactory.ts"

export const grindleBundle = makePluginFactory("grindleBundle")((_k) => {
    return kCtxProvider(_k)
})
