import type { GameObj, KAPLAYCtx, PosComp, RotateComp, Vec2 } from "kaplay"

export class RotateAroundControllerNoCtx {
    private _origAngle: number
    private k: KAPLAYCtx
    private onGetOrigin: () => Vec2
    private origPos: Vec2
    private obj: GameObj<PosComp | RotateComp>
    private _offset: number = 0

    constructor(
        k: KAPLAYCtx,
        obj: GameObj<PosComp | RotateComp>,
        onGetOrigin: () => Vec2,
    ) {
        this.k = k
        this.obj = obj
        this.onGetOrigin = onGetOrigin
        this.origPos = obj.pos.clone()
        this._origAngle = obj.angle
    }

    offset(): number {
        return this._offset
    }
    origAngle(): number {
        return this._origAngle
    }
    moveTo(angle: number): void {
        this._offset = angle
        this.obj.pos = rotateAroundAbs(
            this.k,
            this.onGetOrigin(),
            this.origPos,
            this.origAngle(),
            this.origAngle() + this._offset,
        )
    }
    moveBy(angle: number): void {
        this._offset += angle
        this.obj.pos = rotateAroundAbs(
            this.k,
            this.onGetOrigin(),
            this.origPos,
            this.origAngle(),
            this.origAngle() + this._offset,
        )
    }
}

function rotateAroundAbs(
    k: KAPLAYCtx,
    origin: Vec2,
    origPos: Vec2,
    origAngle: number,
    currAngle: number,
): Vec2 {
    // Calculate rotation in radians
    const totalRotDeg = currAngle - origAngle
    const totalRotRad = totalRotDeg * (Math.PI / 180)

    // Get the vector from center to original position
    const relativePos = origPos.sub(origin)

    // Apply rotation directly using rotation matrix
    // This avoids potential issues with atan2 and coordinate systems
    const cos = Math.cos(totalRotRad)
    const sin = Math.sin(totalRotRad)

    const rotatedX = relativePos.x * cos - relativePos.y * sin
    const rotatedY = relativePos.x * sin + relativePos.y * cos

    // Add the rotated vector back to the center point
    return origin.add(k.vec2(rotatedX, rotatedY))
}
