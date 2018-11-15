export * from "https://unpkg.com/lit-html?module";
export default class EEBase extends HTMLElement {
    constructor() {
        super(...arguments);
        this.Root = this.CreateRoot();
    }
    get Proto() {
        return this.constructor.prototype;
    }
    CreateRoot() {
        return this.attachShadow({ mode: "open" });
    }
    static toString() {
        return this.Namespace + "-" + (this.name.charAt(0).toLowerCase() +
            this.name.substr(1).replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`));
    }
    static X(Obj) {
        const E = document.createElement(this.toString());
        if (E)
            Object.assign(E, Obj);
        return E;
    }
}
EEBase.Namespace = "empati";
export function CustomElement(ctor) {
    customElements.define(ctor.toString(), ctor);
}
//# sourceMappingURL=Particles.js.map