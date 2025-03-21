export function deepFreeze<T>(obj: T): Readonly<T> {
    const seen = new WeakSet<object>()
    function recursiveFreeze<T>(obj: T): Readonly<T> {
        if (obj == null || typeof obj !== "object") return obj
        if (seen.has(obj as object)) return obj
        seen.add(obj as object)
        Object.freeze(obj)
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            const value = obj[prop as keyof T]
            if (value && typeof value === "object") {
                recursiveFreeze(value)
            }
        })
        return obj
    }
    return recursiveFreeze(obj)
}
