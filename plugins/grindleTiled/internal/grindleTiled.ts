import { makePluginFactory } from "./makePluginFactory.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const grindleTiled = makePluginFactory("grindleTiled")((_k) => {
    return kCtxProvider(_k)
})
