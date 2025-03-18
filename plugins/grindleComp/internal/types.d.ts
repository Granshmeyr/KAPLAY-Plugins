/* eslint-disable filename-export/match-named-export */
import type { idNoCtx } from "./idNoCtx"
import type {
    AgentComp,
    AnimateComp,
    AreaComp,
    AreaEffectorComp,
    AnchorComp,
    BodyComp,
    BuoyancyEffectorComp,
    CircleComp,
    ColorComp,
    ConstantForceComp,
    DoubleJumpComp,
    EllipseComp,
    FixedComp,
    FollowComp,
    HealthComp,
    LayerComp,
    MaskComp,
    NamedComp,
    OffScreenComp,
    OpacityComp,
    OutlineComp,
    PathfinderComp,
    ParticlesComp,
    PatrolComp,
    PlatformEffectorComp,
    PointEffectorComp,
    PolygonComp,
    PosComp,
    RectComp,
    RotateComp,
    ScaleComp,
    SentryComp,
    ShaderComp,
    SpriteComp,
    StateComp,
    StayComp,
    SurfaceEffectorComp,
    TextComp,
    TextInputComp,
    TimerComp,
    TileComp,
    UVQuadComp,
    ZComp,
    Comp,
    KAPLAYCtx,
} from "kaplay"
import type { grindleUtil } from "../../grindleUtil"

export namespace GrindleComp {
    export type TypeMap = {
        [__id.agent]: AgentComp
        [__id.animate]: AnimateComp
        [__id.area]: AreaComp
        [__id.areaEffector]: AreaEffectorComp
        [__id.anchor]: AnchorComp
        [__id.body]: BodyComp
        [__id.buoyancyEffector]: BuoyancyEffectorComp
        [__id.circle]: CircleComp
        [__id.color]: ColorComp
        [__id.constantForce]: ConstantForceComp
        [__id.doubleJump]: DoubleJumpComp
        [__id.ellipse]: EllipseComp
        [__id.fixed]: FixedComp
        [__id.follow]: FollowComp
        [__id.health]: HealthComp
        [__id.layer]: LayerComp
        [__id.lifespan]: LifespanComp
        [__id.mask]: MaskComp
        [__id.move]: MoveComp
        [__id.named]: NamedComp
        [__id.offscreen]: OffScreenComp
        [__id.opacity]: OpacityComp
        [__id.outline]: OutlineComp
        [__id.pathfinder]: PathfinderComp
        [__id.particles]: ParticlesComp
        [__id.patrol]: PatrolComp
        [__id.platformEffector]: PlatformEffectorComp
        [__id.pointEffector]: PointEffectorComp
        [__id.polygon]: PolygonComp
        [__id.pos]: PosComp
        [__id.rect]: RectComp
        [__id.rotate]: RotateComp
        [__id.scale]: ScaleComp
        [__id.sentry]: SentryComp
        [__id.shader]: ShaderComp
        [__id.sprite]: SpriteComp
        [__id.state]: StateComp
        [__id.stay]: StayComp
        [__id.surfaceEffector]: SurfaceEffectorComp
        [__id.text]: TextComp
        [__id.textInput]: TextInputComp
        [__id.timer]: TimerComp
        [__id.tile]: TileComp
        [__id.uvquad]: UVQuadComp
        [__id.z]: ZComp
    }
    type LifespanComp = Comp & {
        id: typeof __id.lifespan
        require: [typeof __id.opacity]
    }
    type MoveComp = Comp & {
        id: typeof __id.move
        require: [typeof __id.pos]
    }

    const __id: ReturnType<typeof idNoCtx>
}

export type PluggedK = KAPLAYCtx & ReturnType<typeof grindleUtil>
