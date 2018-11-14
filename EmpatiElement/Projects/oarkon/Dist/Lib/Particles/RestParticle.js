import EEBase from "../Particles";
export function Request(Ep, Data) {
    return function (Target, Key) {
        if (!("Requests" in Target))
            Target.Requests = [];
        Target.Requests.push({
            Ep,
            Data,
            Key
        });
    };
}
export function Bind(Event) {
    return function (Target, Key) {
        if (!("Bindings" in Target))
            Target.Bindings = [];
        Target.Bindings.push({ Event, Key });
    };
}
const MinimalRest = RestParticle(EEBase);
export default function RestParticle(Ctor) {
    return class RestParticleP extends Ctor {
        constructor(...args) {
            super(...args);
            if ("Requests" in this.Proto)
                for (const Req of this.Proto.Requests) {
                    this["$Request" + Req.Key] = () => {
                        const Data = Req.Data && Req.Data.constructor == Function
                            ? Req.Data.call(this)
                            : Req.Data;
                        this[Req.Key] = fetch(Req.Ep, {
                            body: Data,
                            method: Req.Data ? "POST" : "GET",
                            credentials: "same-origin"
                        }).then(x => x.json());
                    };
                    this["$Request" + Req.Key]();
                }
            if ("Bindings" in this.Proto)
                for (const Bind of this.Proto.Bindings) {
                    if ("$Request" + Bind.Key in this)
                        this.addEventListener(Bind.Event, this["$Request" + Bind.Key].bind(this));
                }
        }
    };
}
//# sourceMappingURL=RestParticle.js.map