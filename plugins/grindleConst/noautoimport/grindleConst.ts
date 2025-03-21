import { makePluginFactory } from "./makePluginFactory.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const grindleConst = makePluginFactory("grindleConst")((_k) => {
    return kCtxProvider(_k)
})
