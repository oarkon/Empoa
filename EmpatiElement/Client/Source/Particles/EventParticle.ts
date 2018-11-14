import EEBase, { Constructor } from "../Particles";

export const IESTarget = new EventTarget();

type HostOptions = EEBase | string | Window;

export function Event(
  Event: string,
  Host?: ((this: EEBase) => HostOptions | HostOptions[]) | HostOptions
) {
  return function (Target: any, Key: string) {
    if (!("Events" in Target)) Target.Events = [];
    //@ts-ignore
    (Target as typeof EEBase).Events.push({
      Event,
      Host,
      Func: Target[Key]
    });
  };
}

export function IEvent(Event: string) {
  return function (Target: any, Key: string) {
    if (!("IEvents" in Target)) Target.IEvents = [];
    //@ts-ignore
    (Target as typeof EEBase).IEvents.push({
      Event,
      Func: Target[Key]
    });
  };
}

export default function EventParticle<TBase extends Constructor<EEBase>>(
  Ctor: TBase
) {
  return class EventParticleP extends Ctor {
    static Events: Array<{
      Host?: (this: HTMLElement) => HTMLElement | string;
      Event: string;
      Func: Function;
    }>;
    static IEvents: Array<{
      Event: string;
      Func: Function;
    }>;

    FirstRender(...args: any[]) {
      //@ts-ignore
      if (super.FirstRender) super.FirstRender(...args);
      if ("Events" in this.Proto)
        (this.Proto as typeof EventParticleP).Events.forEach(x => {
          let Host: HTMLElement | HTMLElement[] = this;
          if (x.Host) {
            if (typeof x.Host === "string")
              Host = Array.from((this.Root as ShadowRoot).querySelectorAll(x.Host));
            else if (typeof x.Host == "function") Host = x.Host.call(this);
            else Host = x.Host;
          }
          if (Host instanceof Array)
            Host.forEach(w => w.addEventListener(x.Event, (E: any) => x.Func.call(this, E, w)));
          else Host.addEventListener(x.Event, (E: any) => x.Func.call(this, E, Host));
        });
      if ("IEvents" in this.Proto)
        (this.Proto as typeof EventParticleP).IEvents.forEach(x => {
          IESTarget.addEventListener(x.Event, x.Func.bind(this));
        });
    }

    Dispatch(Key: string, Data: any) {
      this.dispatchEvent(new CustomEvent(Key, { detail: Data }));
    }
  };
}
