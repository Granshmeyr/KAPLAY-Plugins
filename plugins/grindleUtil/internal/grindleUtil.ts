import { makePluginFactory } from "./makePluginFactory.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const grindleUtil = makePluginFactory("grindleUtil")((_k) => {
    return kCtxProvider(_k)
})
