import type { GrindleTiled } from "./types.d.ts"

export const propertyUtil = {
    isString(
        prop: GrindleTiled.Property,
    ): prop is GrindleTiled.Property<string> {
        return prop.type === "string"
    },
    isBoolean(
        prop: GrindleTiled.Property,
    ): prop is GrindleTiled.Property<boolean> {
        return prop.type === "bool"
    },
    isNumber(
        prop: GrindleTiled.Property,
    ): prop is GrindleTiled.Property<number> {
        return prop.type === "float" || prop.type === "int"
    },
} as const
