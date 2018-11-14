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
      ${Object.entries(Navbar.Links).map(x => html`
        <li
            ?active=${this.Active == x[1]} 
            ?hidden=${this.Active != x[1]}
            .href=${x[1]}
          >${x[0]}</li>
      `)}
    </ul>
  `
  }
}/* 
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


@Execute
class Body extends ViewManager {

  Render() {
    return html`
    ${new Test}
    <empati-button></empati-button>
    ${new Navbar}`;
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