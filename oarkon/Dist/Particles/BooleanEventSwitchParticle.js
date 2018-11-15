export function Switch(TrueEvent, FalseEvent) {
    return function (Target, Key) {
        if (!("BooleanEventSwitchs" in Target))
            Target.BooleanEventSwitchs = [];
        Target.BooleanEventSwitchs.push({
            Key, TrueEvent, FalseEvent
        });
    };
}
export default function BooleanEventSwitchParticle(Ctor) {
    return class BooleanEventSwitchParticleP extends Ctor {
        constructor(...args) {
            super(...args);
            if ("BooleanEventSwitchs" in this.Proto)
                for (const Switchs of this.Proto.BooleanEventSwitchs) {
                    this.addEventListener(Switchs.TrueEvent, () => {
                        this[Switchs.Key] = true;
                    });
                    this.addEventListener(Switchs.FalseEvent, () => {
                        this[Switchs.Key] = false;
                    });
                }
        }
    };
}
//# sourceMappingURL=BooleanEventSwitchParticle.js.map