export async function resolveObjPromises<
    TPromisifedRecord extends Record<string, Promise<unknown>>,
>(obj: TPromisifedRecord): Promise<AwaitedRecord<TPromisifedRecord>> {
    const resolved: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(obj)) {
        resolved[k] = await v
    }
    return resolved as AwaitedRecord<TPromisifedRecord>
}

type AwaitedRecord<T> = {
    [K in keyof T]: Awaited<T[K]>
}
