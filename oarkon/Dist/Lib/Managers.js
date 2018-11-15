var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html } from "./Particles";
import EmpatiElement from "./Element";
import { Property } from "./Particles/PropertyParticle";
export function Execute(ctor) {
    customElements.define(ctor.toString(), ctor);
    const E = document.createElement(ctor.toString());
    document.documentElement.appendChild(E);
}
export default class Manager extends EmpatiElement {
    constructor() {
        super(...arguments);
        this.Style = {
            display: "none"
        };
    }
}
export class ViewManager extends Manager {
    CreateRoot() {
        return document.body;
    }
}
export class MetaManager extends Manager {
    constructor() {
        super(...arguments);
        this.Manifest = {};
    }
    CreateRoot() {
        return document.head;
    }
    Render() {
        return html `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${Object.keys(this.Manifest).map(Key => html `
        <meta name="${Key}" content="${this.Manifest[Key]}">
      `)}
      <title>${this.Title}</title>
    `;
    }
}
__decorate([
    Property,
    __metadata("design:type", String)
], MetaManager.prototype, "Title", void 0);
__decorate([
    Property,
    __metadata("design:type", Object)
], MetaManager.prototype, "Manifest", void 0);
//# sourceMappingURL=Managers.js.map