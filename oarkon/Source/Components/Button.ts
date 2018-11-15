import { CustomElement, html } from "../Lib/Particles";
import { Property } from "../Lib/Particles/PropertyParticle";
import { Switch } from "../Particles/BooleanEventSwitchParticle";
import { Event } from "../Lib/Particles/EventParticle";
import EmpatiElement from "../Lib/Element";

@CustomElement
export class Buttons extends EmpatiElement {

  @Property
  @Switch("mouseover", "mouseout") HoverStatus: boolean = false;

  Render() {
    return html`
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

  @Event("click")
  OnClick(Event: MouseEvent) {
    const ModalInstance = document.querySelector(Modal.toString()) as Modal; 6
    ModalInstance.ModalOpen(Event);
  }

}