export function extractFileName(file: string): string {
    const normalizedPath = file.replace(/\\/g, "/")
    const parts = normalizedPath.split("/")
    const fileNameWithExtension = parts.pop() || ""
    const lastDotIndex = fileNameWithExtension.lastIndexOf(".")
    return lastDotIndex === -1
        ? fileNameWithExtension
        : fileNameWithExtension.substring(0, lastDotIndex)
}
