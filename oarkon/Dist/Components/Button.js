var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CustomElement, html } from "../Lib/Particles";
import { Property } from "../Lib/Particles/PropertyParticle";
import { Switch } from "../Particles/BooleanEventSwitchParticle";
import { Event } from "../Lib/Particles/EventParticle";
import EmpatiElement from "../Lib/Element";
let Buttons = class Buttons extends EmpatiElement {
    constructor() {
        super(...arguments);
        this.HoverStatus = false;
    }
    Render() {
        return html `
     <style>
       :host {
         border: 1px solid black;
         padding: 8px 16px;
         background-color: grey;
         opacity: 1;
         transition: .15s;
       }

       [hover] {
         opacity: .2;

       }

       [hidden] {
         opacity: 0;
       }
     </style>
     <span ?hover=${this.HoverStatus}>hey</span>
   `;
    }
    OnClick(Event) {
        const ModalInstance = document.querySelector(Modal.toString());
        6;
        ModalInstance.ModalOpen(Event);
    }
};
__decorate([
    Property,
    Switch("mouseover", "mouseout"),
    __metadata("design:type", Boolean)
], Buttons.prototype, "HoverStatus", void 0);
__decorate([
    Event("click"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Buttons.prototype, "OnClick", null);
Buttons = __decorate([
    CustomElement
], Buttons);
export { Buttons };
//# sourceMappingURL=Button.js.map