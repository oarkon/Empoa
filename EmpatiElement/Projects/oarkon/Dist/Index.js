var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Navbar_1;
import Manager, { ViewManager, Execute, MetaManager } from "./Lib/Managers";
import { html, CustomElement } from "./Lib/Particles";
import EmpatiElement from "./Lib/Element";
import { Request } from "./Lib/Particles/RestParticle";
import { QueryAll } from "./Lib/Particles/QSParticle";
import { Event } from "./Lib/Particles/EventParticle";
import { Property } from "./Lib/Particles/PropertyParticle";
import BooleanEventSwitchParticle, { Switch } from "./Particles/BooleanEventSwitchParticle";
let OArkonElement = class OArkonElement extends EmpatiElement {
};
OArkonElement = __decorate([
    BooleanEventSwitchParticle
], OArkonElement);
let Test = class Test extends EmpatiElement {
    FirstRender() {
        this.InnerBar.forEach(x => console.log(x));
    }
    Render() {
        return html `${this.GetRequest.then(JSON.stringify)}<h1>Title</h1>`;
    }
};
__decorate([
    Request("https://httpbin.org/get"),
    __metadata("design:type", Object)
], Test.prototype, "GetRequest", void 0);
__decorate([
    QueryAll(".button"),
    __metadata("design:type", Array)
], Test.prototype, "InnerBar", void 0);
Test = __decorate([
    CustomElement
], Test);
let Navbar = Navbar_1 = class Navbar extends EmpatiElement {
    constructor() {
        super(...arguments);
        this.Active = Navbar_1.Links.Home;
    }
    OnLinkClick(Event, Link) {
        this.Active = Link.href;
    }
    Render() {
        return html `
    <style>     
      :host{
        margin:0 ;
        padding:0;
      } 
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #333;
        }

        li {
            float: left;
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        li[active] {
          background-color: #111;
        }

        [hidden] {
          opacity: .8;
        }

        li:hover {
            background-color: #111;
        }              
    </style>
    <ul>
      ${Object.entries(Navbar_1.Links).map(x => html `
        <li
            ?active=${this.Active == x[1]} 
            ?hidden=${this.Active != x[1]}
            .href=${x[1]}
          >${x[0]}</li>
      `)}
    </ul>
  `;
    }
};
Navbar.Links = {
    Home: "#home",
    News: "#news",
    Contact: "#contact",
    About: "#about"
};
__decorate([
    QueryAll("li"),
    __metadata("design:type", Array)
], Navbar.prototype, "Links", void 0);
__decorate([
    Property,
    __metadata("design:type", Object)
], Navbar.prototype, "Active", void 0);
__decorate([
    Event("click", "li"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent, HTMLAnchorElement]),
    __metadata("design:returntype", void 0)
], Navbar.prototype, "OnLinkClick", null);
Navbar = Navbar_1 = __decorate([
    CustomElement
], Navbar);
let Modal = class Modal extends Manager {
    constructor() {
        super(...arguments);
        this.displayStatus = false;
        this.Style = {};
    }
    BackdropClick(Event) {
        if (this.displayStatus)
            this.ModalClose();
    }
    ModalClick(Event) {
        Event.stopPropagation();
        Event.preventDefault();
        return false;
    }
    ModalOpen(Event) {
        this.displayStatus = true;
        if (Event)
            Event.stopPropagation();
    }
    ModalClose() {
        this.displayStatus = false;
    }
    Render() {
        return html `
    <style>
    :host{
      position: fixed; /* Stay in place */      
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      display: ${this.displayStatus ? "block" : "none"};
    }
    span{
      background-color: #fefefe;
      margin: 15% auto; /* 15% from the top and centered */
      padding: 20px;
      border: 1px solid #888;
      width: 80%; /* Could be more or less, depending on screen size */
    }
    </style>
    <span id="Modal">Selamlar...!</span>
    `;
    }
};
__decorate([
    Property,
    __metadata("design:type", Boolean)
], Modal.prototype, "displayStatus", void 0);
__decorate([
    Event("click", window),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Modal.prototype, "BackdropClick", null);
__decorate([
    Event("click", "#Modal"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Modal.prototype, "ModalClick", null);
Modal = __decorate([
    Execute
], Modal);
let Button = class Button extends OArkonElement {
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
], Button.prototype, "HoverStatus", void 0);
__decorate([
    Event("click"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Button.prototype, "OnClick", null);
Button = __decorate([
    CustomElement
], Button);
let Body = class Body extends ViewManager {
    Render() {
        return html `
    ${new Test}
    <empati-button></empati-button>
    ${new Navbar}`;
    }
};
Body = __decorate([
    Execute
], Body);
let Meta = class Meta extends MetaManager {
    constructor() {
        super(...arguments);
        this.Title = "Test";
        this.Manifest = {
            description: "test page"
        };
    }
};
Meta = __decorate([
    Execute
], Meta);
//# sourceMappingURL=Index.js.map