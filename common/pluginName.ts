import { makePluginFactory } from "./makePluginFactory.ts"
import { kCtxProvider } from "./kCtxProvider.ts"

export const pluginName = makePluginFactory("pluginName")((_k) => {
    return kCtxProvider(_k)
})
