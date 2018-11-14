export const IESTarget = new EventTarget();
export function Event(Event, Host) {
    return function (Target, Key) {
        if (!("Events" in Target))
            Target.Events = [];
        Target.Events.push({
            Event,
            Host,
            Func: Target[Key]
        });
    };
}
export function IEvent(Event) {
    return function (Target, Key) {
        if (!("IEvents" in Target))
            Target.IEvents = [];
        Target.IEvents.push({
            Event,
            Func: Target[Key]
        });
    };
}
export default function EventParticle(Ctor) {
    return class EventParticleP extends Ctor {
        FirstRender(...args) {
            if (super.FirstRender)
                super.FirstRender(...args);
            if ("Events" in this.Proto)
                this.Proto.Events.forEach(x => {
                    let Host = this;
                    if (x.Host) {
                        if (typeof x.Host === "string")
                            Host = Array.from(this.Root.querySelectorAll(x.Host));
                        else if (typeof x.Host == "function")
                            Host = x.Host.call(this);
                        else
                            Host = x.Host;
                    }
                    if (Host instanceof Array)
                        Host.forEach(w => w.addEventListener(x.Event, (E) => x.Func.call(this, E, w)));
                    else
                        Host.addEventListener(x.Event, (E) => x.Func.call(this, E, Host));
                });
            if ("IEvents" in this.Proto)
                this.Proto.IEvents.forEach(x => {
                    IESTarget.addEventListener(x.Event, x.Func.bind(this));
                });
        }
        Dispatch(Key, Data) {
            this.dispatchEvent(new CustomEvent(Key, { detail: Data }));
        }
    };
}
//# sourceMappingURL=EventParticle.js.map