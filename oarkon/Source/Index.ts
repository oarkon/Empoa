import Manager, { ViewManager, Execute, MetaManager } from "./Lib/Managers";
import { html, CustomElement } from "./Lib/Particles";
import EmpatiElement from "./Lib/Element";
import { Request } from "./Lib/Particles/RestParticle";
import { Query, QueryAll } from "./Lib/Particles/QSParticle";
import { Event } from "./Lib/Particles/EventParticle";
import { Property, Attribute } from "./Lib/Particles/PropertyParticle";
import BooleanEventSwitchParticle, { Switch } from "./Particles/BooleanEventSwitchParticle";

@BooleanEventSwitchParticle
class OArkonElement extends EmpatiElement {
  static Namespace = "oarkon"
}

@CustomElement
class Test extends EmpatiElement {

  @Request("https://httpbin.org/get") GetRequest: any;

  @QueryAll(".button") InnerBar: HTMLElement[];

  FirstRender() {
    this.InnerBar.forEach(x => console.log(x));
  }

  Render() {
    return html`${this.GetRequest.then(JSON.stringify)}<h1>Title</h1>`;
  }
}

@CustomElement
class Navbar extends EmpatiElement {

  @QueryAll("li") Links: HTMLAnchorElement[];


  static Links = {
    Home: "#home",
    News: "#news",
    Contact: "#contact",
    About: "#about"
  };

  @Property Active = Navbar.Links.Home;

  @Event("click", "li")
  OnLinkClick(Event: MouseEvent, Link: HTMLAnchorElement) {
    this.Active = Link.href;
  }


  Render() {
    return html`
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
      ${Object.entries(Navbar.Links).map(x => html`
        <li
            ?active=${this.Active == x[1]} 
            ?hidden=${this.Active != x[1]}
            .href=${x[1]}
          >${x[0]}</li>
      `)}
      <oarkon-dropdown></oarkon-dropdown>
    </ul>
  `
  }
}


@CustomElement
class Dropdown extends OArkonElement {
  @Property
  @Switch("mouseover", "mouseout") dropStatus: Boolean = false;

  static Item = {
    Link: "#Link1",
    Link2: "#Link2",
    Link3: "#Link3"
  }

  Render() {
    return html`
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
      ${Object.entries(Dropdown.Item).map(x => html`
    <a href=${x[1]}>${x[0]}</a>
      `)}
    </div>
    `;
  }
}
/* 
  @Event("mouseover")
  MouseOver(){
    this.HoverStatus = true;
  }

  @Event("mouseout")
  MouseOut(){
    this.HoverStatus = false;
  } */
@Execute
class Modal extends Manager {
  /** Her zaman gorunur olunmasi isteniyorsa true olmalidir. */
  @Property displayStatus: boolean = false;

  @Event("click", window)
  BackdropClick(Event: MouseEvent) {
    if (this.displayStatus)
      this.ModalClose();
  }
  @Event("click", "#Close")
  Click(Event: MouseEvent) {
    if (this.displayStatus)
      this.ModalClose();
  }


  @Event("click", "#Modal")
  ModalClick(Event: MouseEvent) {
    Event.stopPropagation();
    Event.preventDefault();
    return false;
  }

  ModalOpen(Event?: MouseEvent) {
    this.displayStatus = true;
    if (Event) Event.stopPropagation();
  }

  ModalClose() {
    this.displayStatus = false;
  }

  Style = {};
  /**Modalin stil ozelliklerini ve icinde yazicaklari goruyoruz. */
  Render() {
    return html`
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
    `
  }
}



@CustomElement
class Button extends OArkonElement {

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

  @Event("click")
  OnClick(Event: MouseEvent) {
    const ModalInstance = document.querySelector(Modal.toString()) as Modal;
    ModalInstance.ModalOpen(Event);
  }

}

@Execute
class SideButton extends Manager {

  @Property
  @Switch("mouseover", "mouseout") Hover: boolean = false;

  @Event("click")
  OpenSide() {

  }

  Style = {};

  Render() {
    return html`
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
}

@CustomElement
class SideNav extends OArkonElement {
  Render() {
    return html`
    <style>
    
    </style>
    <div>

    </div>
    `;
  }
}




@Execute
class Body extends ViewManager {

  Render() {
    return html`
    ${new Test}
    <oarkon-button></oarkon-button>
    ${new Navbar}
    `;
  }
}

@Execute
class Meta extends MetaManager {
  Title = "Test";
  Manifest = {
    description: "test page"
  };
}

/*  opacity: ${this.HoverStatus ? .2 : 1};
 */

 /* Opacıty 0 yap pointer none transition ekleyebilirsin */