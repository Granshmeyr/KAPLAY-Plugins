export function getAngleTo(currentAngle: number, targetAngle: number) {
    const newTargetAngle = ((targetAngle % 360) + 360) % 360
    const rotations = Math.round((currentAngle - newTargetAngle) / 360)
    const closestTargetAngle = newTargetAngle + rotations * 360
    return closestTargetAngle - currentAngle
}
