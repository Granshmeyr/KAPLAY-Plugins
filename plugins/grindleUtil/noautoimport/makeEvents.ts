export function makeEvents<TNames extends readonly string[]>(
    prefix: string,
    names: TNames,
): {
    [K in TNames[number]]: string
} {
    const r = {} as { [K in TNames[number]]: string }
    for (const n of names) {
        r[n as TNames[number]] = `${prefix}${n}`
    }
    return r
}
