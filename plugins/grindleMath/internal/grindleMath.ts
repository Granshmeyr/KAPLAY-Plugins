import { makePluginFactory } from "./makePluginFactory.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const grindleMath = makePluginFactory("grindleMath")((_k) => {
    return kCtxProvider(_k)
})
