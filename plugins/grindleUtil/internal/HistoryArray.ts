export class HistoryArray<T> {
    private items: T[]
    private maxLength: number

    constructor(maxLength: number) {
        if (maxLength <= 0) {
            throw new Error("Maximum length must be greater than 0")
        }
        this.items = []
        this.maxLength = maxLength
    }
    push(item: T): void {
        if (this.items.length >= this.maxLength) {
            this.items.shift()
        }
        this.items.push(item)
    }
    getHistory(count: number): T[] {
        if (count == null) {
            return [...this.items]
        }

        if (count <= 0) {
            return []
        }

        return [...this.items.slice(-count)]
    }
    get length(): number {
        return this.items.length
    }
    get capacity(): number {
        return this.maxLength
    }
    at(index: number): T | undefined {
        return this.items[index]
    }
    clear(): void {
        this.items = []
    }
}
