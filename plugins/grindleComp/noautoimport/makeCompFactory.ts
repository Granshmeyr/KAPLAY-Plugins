import type { Comp } from "kaplay"

export function makeCompFactory<TComp extends Comp, TCompOpt extends CompOpt>(
    defaultCompOpt: ForceOptional<TCompOpt>,
    makeComp: (opt: TCompOpt) => TComp,
): HasRequiredProperties<TCompOpt> extends true
    ? CompFactory<TComp, TCompOpt>
    : CompFactoryOpt<TComp, TCompOpt> {
    return (compOpt: TCompOpt) => makeComp({ ...defaultCompOpt, ...compOpt })
}

type CompOpt = Record<string, unknown>
type CompFactory<TComp extends Comp, TCompOpt extends CompOpt> = (
    compOpt: TCompOpt,
) => TComp
type CompFactoryOpt<TComp extends Comp, TCompOpt extends CompOpt> = (
    compOpt?: TCompOpt,
) => TComp
type RemoveRequired<T> = {
    [K in keyof T as unknown extends Pick<T, K> ? K : never]: T[K]
}
type ForceOptional<T> = Required<RemoveRequired<T>>
type HasRequiredProperties<T> = keyof T extends never
    ? false
    : {
            [K in keyof T]-?: unknown extends Pick<T, K> ? never : K
        }[keyof T] extends never
      ? false
      : true
