var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Navbar_1, Dropdown_1;
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
OArkonElement.Namespace = "oarkon";
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
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;   
          background-color: #333;
        }

        li {
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
      <oarkon-dropdown></oarkon-dropdown>
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
let Dropdown = Dropdown_1 = class Dropdown extends OArkonElement {
    constructor() {
        super(...arguments);
        this.dropStatus = false;
    }
    Render() {
        return html `
    <style>
      :host{
          position:relative;
          color:white;
          opacity:.8;
        }

        :host :hover{
          background-color: #111;
        }

      span{
        position: absolute;
        padding:14px 16px;
      }

      [hidden] {
        display: none;
      }

      .dropdown-content {
        text-align:left;
        top:100%;
        position: absolute;
        left: 0;
        background-color: #f1f1f1;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
      }
      .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
      }
      .dropdown-content a:hover {background-color: #ddd;}
    </style>
     <span>Button</span>
    <div class="dropdown-content" ?hidden=${!this.dropStatus}>
      ${Object.entries(Dropdown_1.Item).map(x => html `
    <a href=${x[1]}>${x[0]}</a>
      `)}
    </div>
    `;
    }
};
Dropdown.Item = {
    Link: "#Link1",
    Link2: "#Link2",
    Link3: "#Link3"
};
__decorate([
    Property,
    Switch("mouseover", "mouseout"),
    __metadata("design:type", Boolean)
], Dropdown.prototype, "dropStatus", void 0);
Dropdown = Dropdown_1 = __decorate([
    CustomElement
], Dropdown);
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
    Click(Event) {
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
      right:0;
      bottom:0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      display: ${this.displayStatus ? "block" : "none"};
    }
    #Modal{
      width: 400px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    color: #333333;
    text-align:center;
    }
    .modal-close {
    color: white;
    line-height: 50px;
    font-size: 80%;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 70px;
    text-decoration: none;  
    }
    </style>
    <div id="Modal">
      <a id="Close" class="modal-close">Close!</a>
    <h1>This Window Open Cause U Clicked Button!</h1>
    <span >Thanks For Click...!</span>
    </div>
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
    Event("click", "#Close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Modal.prototype, "Click", null);
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
         display:inline-block;
       }

       [hover] {
         opacity: .2;

       }

       [hidden] {
         opacity: 0;
       }
     </style>
     <span ?hover=${this.HoverStatus}>Modal Button</span>
   `;
    }
    OnClick(Event) {
        const ModalInstance = document.querySelector(Modal.toString());
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
let SideButton = class SideButton extends Manager {
    constructor() {
        super(...arguments);
        this.Hover = false;
        this.Style = {};
    }
    OpenSide() {
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
         display:inline-flex;
         position:fixed;
         left:0;
         top:0;
         transform: rotate(90deg);

       }

       [hover] {
         opacity: .2;
       }

       [hidden] {
         opacity: 0;
       }
     </style>
     <span ?hover=${this.Hover}>SideNav Button</span>
   `;
    }
};
__decorate([
    Property,
    Switch("mouseover", "mouseout"),
    __metadata("design:type", Boolean)
], SideButton.prototype, "Hover", void 0);
__decorate([
    Event("click"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SideButton.prototype, "OpenSide", null);
SideButton = __decorate([
    Execute
], SideButton);
let SideNav = class SideNav extends OArkonElement {
    Render() {
        return html `
    <style>
    
    </style>
    <div>

    </div>
    `;
    }
};
SideNav = __decorate([
    CustomElement
], SideNav);
let Body = class Body extends ViewManager {
    Render() {
        return html `
    ${new Test}
    <oarkon-button></oarkon-button>
    ${new Navbar}
    `;
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