import EEBase from "../Particles";
const MinimalQSI = QuerySelectorParticle(EEBase);
export function Query(Selector) {
    return function (Target, Key) {
        if (!("Queries" in Target))
            Target.Queries = {};
        Target.Queries[Key] = Selector;
    };
}
export function QueryAll(Selector) {
    return function (Target, Key) {
        if (!("AllQueries" in Target))
            Target.AllQueries = {};
        Target.AllQueries[Key] = Selector;
    };
}
export default function QuerySelectorParticle(Ctor) {
    return class QSParticleP extends Ctor {
        constructor(...args) {
            super(...args);
            if ("Queries" in this.Proto)
                for (const Key in this.Proto.Queries)
                    Object.defineProperty(this, Key, {
                        get() {
                            return this.Root.querySelector(this.Proto.Queries[Key]);
                        }
                    });
            if ("AllQueries" in this.Proto)
                for (const Key in this.Proto.AllQueries)
                    Object.defineProperty(this, Key, {
                        get() {
                            return Array.from(this.Root.querySelectorAll(this.Proto.AllQueries[Key]));
                        }
                    });
        }
    };
}
//# sourceMappingURL=QSParticle.js.map