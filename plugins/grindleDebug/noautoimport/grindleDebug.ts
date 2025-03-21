import { makePluginFactory } from "./makePluginFactory.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const grindleDebug = makePluginFactory("grindleDebug")((_k) => {
    return kCtxProvider(_k)
})
