import type { Comp, CompList } from "kaplay"
import type { GrindleComp } from "../../grindleComp/index.ts"
import type { GrindleUtil } from "../../grindleUtil/index.ts"

export function withCompId<TCompId extends GrindleUtil.Enum<string>>() {
    return function withCompMap<
        TGameCompMap extends Record<keyof TCompId, Comp>,
    >() {
        return function makeBundleFactorySuper<
            TRequireProp extends
                | Extract<keyof TGameCompMap, string>
                | keyof GrindleComp.TypeMap = never,
        >() {
            return function makeBundleFactory<
                TGCId extends Extract<keyof TGameCompMap, string>,
                TKCId extends keyof GrindleComp.TypeMap,
                TDefaultCompKey extends TGCId | TKCId,
            >(defaultComp: {
                [K in TDefaultCompKey]?: () => K extends TGCId
                    ? TGameCompMap[K]
                    : K extends TKCId
                    ? GrindleComp.TypeMap[K]
                    : never
            }): HasRequiredProperties<
                RequiredBy<
                    typeof defaultComp,
                    Extract<TRequireProp, TDefaultCompKey>
                >
            > extends true
                ? (
                      comp: RequiredBy<
                          typeof defaultComp,
                          Extract<TRequireProp, TDefaultCompKey>
                      >,
                  ) => CompList<
                      (TGameCompMap & GrindleComp.TypeMap)[TDefaultCompKey]
                  >
                : (
                      comp?: RequiredBy<
                          typeof defaultComp,
                          Extract<TRequireProp, TDefaultCompKey>
                      >,
                  ) => CompList<
                      (TGameCompMap & GrindleComp.TypeMap)[TDefaultCompKey]
                  > {
                return function bundleFactory(
                    comp: RequiredBy<
                        typeof defaultComp,
                        Extract<TRequireProp, TDefaultCompKey>
                    >,
                ) {
                    const compMap = {
                        ...defaultComp,
                        ...comp,
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const funcs: any = Object.values(compMap)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return funcs.map((v: any) => v()) as CompList<
                        (TGameCompMap & GrindleComp.TypeMap)[TDefaultCompKey]
                    >
                }
            }
        }
    }
}

type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>
type HasRequiredProperties<T> = keyof T extends never
    ? false
    : {
          [K in keyof T]-?: unknown extends Pick<T, K> ? never : K
      }[keyof T] extends never
    ? false
    : true
