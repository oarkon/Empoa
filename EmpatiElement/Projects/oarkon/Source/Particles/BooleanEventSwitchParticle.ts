import EEBase, { Constructor } from "../Lib/Particles";

export function Switch(TrueEvent: string, FalseEvent: string) {
  return function(Target: any, Key: string) {
    if (!("BooleanEventSwitchs" in Target)) Target.BooleanEventSwitchs = [] ;
    (Target as any).BooleanEventSwitchs.push({
      Key, TrueEvent, FalseEvent
    });
  };
}


export default function BooleanEventSwitchParticle<TBase extends Constructor<EEBase>>(
  Ctor: TBase
) {
  return class BooleanEventSwitchParticleP extends Ctor {
    static BooleanEventSwitchs: { Key: string; TrueEvent: string, FalseEvent: string }[];

    constructor(...args: any[]) {
      super(...args);
      if ("BooleanEventSwitchs" in this.Proto)
        for (const Switchs of (this.Proto as typeof BooleanEventSwitchParticleP).BooleanEventSwitchs) {
          this.addEventListener(Switchs.TrueEvent, () => {
            (this as any)[Switchs.Key] = true;
          });
          this.addEventListener(Switchs.FalseEvent, () => {
            (this as any)[Switchs.Key] = false;
          });
        }
      }
  }
}