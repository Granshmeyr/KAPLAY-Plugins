export function extractPath(file: string): string {
    if (!file) throw new Error(`Cannot parse path from ${file}`)
    const lastSlashIndex = file.lastIndexOf("/")
    return file.lastIndexOf("/") === -1 ? "" : file.substring(0, lastSlashIndex)
}
