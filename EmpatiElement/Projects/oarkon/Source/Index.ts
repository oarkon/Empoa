import Manager, { ViewManager, Execute, MetaManager } from "./Lib/Managers";
import { html, CustomElement, TemplateResult } from "./Lib/Particles";
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

/*  */
/* //ANCHOR NAVBAR==================== */
/*  */
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

/*  */
/* //ANCHOR Dropdown==================== */
/*  */
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
/*  */
/* // ANCHOR MODAL==================== */
/*  */

declare global {
  interface Window { Modal: Modal }
}
@Execute
class Modal extends Manager {
  /** Her zaman gorunur olunmasi isteniyorsa true olmalidir. */
  @Property displayStatus: boolean = false;
  @Property template: TemplateResult;

  Constr() {
    window.Modal = this;
  }

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

  ModalOpen(Event?: MouseEvent, Template: TemplateResult) {
    this.displayStatus = true;
    this.template = Template;
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
    max-width:1080px;
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
    ${this.template}
    </div>
    `
  }
}


/*  */
/* // ANCHOR Button==================== */
/*  */
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
         cursor:pointer;
       }

       [hover] {
         opacity: .2;
       }

     </style>
     <span ?hover=${this.HoverStatus}>Modal Button</span>
   `;
  }

  @Event("click")
  OnClick(Event: MouseEvent) {
    window.Modal.ModalOpen(Event, html`
      <h1>This Window Open Cause U Clicked Button!</h1>
      <span>Thanks For Click...!</span>`);
  }

}
/*  */
/* //ANCHOR SideButton==================== */
/*  */

@BooleanEventSwitchParticle
class OarkonManager extends Manager {
  static Namespace = "oarkon"
}

@Execute
class SideButton extends OarkonManager {

  @Property
  @Switch("mouseover", "mouseout") Hover: boolean = false;

  @Attribute
  HiddenNav: Boolean = true;

  @Attribute
  left: boolean = true;

  @Event("click")
  OpenSide(Event: MouseEvent) {
    this.HiddenNav = !this.HiddenNav;
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
         top:150px;
         transition: .15s;
         position:fixed;
         left:15px;
         transform: rotate(-90deg);
         transform-origin: left;
         box-shadow: -1px 1px 16px 3px black;
         cursor:pointer;
       }

       [hover] {
         opacity: .2;
       }
      
       :host([left]){
         left:auto;
         right:270px;
         transform: rotate(90deg);
         transform-origin: right top;
       }

       :host([HiddenNav]){
         right:0;
       }
       
     </style>
     <osman  ?hover=${this.Hover}>SideNav Button</osman>
   `;
  }
}

/*  //!TODO hiddendan cikartmam lazim cunku hidden dogrudan opacity i etkiliyor onun yerine -270 vericem...   */
/*  */
/* //ANCHOR SideNav==================== */
/*  */
@Execute
class SideNav extends OarkonManager {

  @Attribute SideNav: boolean = true;


  @Event("@HiddenNav", document.querySelector("oarkon-side-button") as any)
  onClick(Event: CustomEvent) {
    this.SideNav = Event.detail.New;
  }

  Style = {};

  Render() {
    return html`
    <style>
      :host{
        width:270px;
        top:0;
        bottom:0;
        right:0;
        height:100%;
        margin:0;
        position:fixed; 
        pointer-events:none; 
        transition-timing-function:ease-in-out;   
        transition: .15s; 
      }
      #sidebar{
        width:300px;
        height:100%;
        position:relative;
        background-color:red;
      }
      :host([sidenav]){
        right:-270px;
        pointer-events:auto;  
       }
    </style>
    <div id="sidebar">
      </br>
      asdsads
    </div>
    `;
  }
}

/* //ANCHOR  Image Slider!!!*/

@CustomElement
class SliderModal extends OArkonElement {
  @Property Current: number = 0;

  @Property Images: string[];

  @Event("click", "#Right")
  Right(Event?: MouseEvent) {
    console.log(this.Current);
    if (this.Current < this.Images.length - 1)
      this.Current++;
    if (Event) Event.stopPropagation();
  }

  @Event("click", "#Left")
  Left(Event?: MouseEvent) {
    console.log(this.Current);
    if (this.Current > 0)
      this.Current--;
    if (Event) Event.stopPropagation();
  }

  Render() {
    return html`
    <style>    
    #image{
       max-width: 100%;
        max-height: calc(100vh - 35vh);
        flex-shrink: 0;
        vertical-align: middle;

    }    
     .wrapper{
         margin: auto;
        display: block;
        width: 90%;
        max-width: 700px;
        text-align: center;
        color: #ccc;
        padding: 10px 0;
        height: 60px;
      }
      .close {
          position: absolute;
          top: 15px;
          right: 35px;
          color: #f1f1f1;
          font-size: 40px;
          font-weight: bold;
          transition: 0.3s;
          cursor:pointer;
      }
      .wrap-image {
        border: 2px solid #FFF;
        vertical-align: middle;
        opacity: .6;
      }

      [active] {
        opacity: 1;
      }

      .wrap-image + .wrap-image {
        margin-left: 4px;
      }

      .wrap-image img {
        vertical-align: middle;
        width: 142.22px;
        height: 80px;
        object-fit: cover;
      }

      #Left {
        display: ${this.Current == 0 ? "none" : "flex"};
        position:fixed;
        left:-19px;
        padding:30px;
        bottom:50%;
        font-size:30px;
      }

      .wrapImage{
        padding-left: 4px;
        padding-right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

      }

      #Right {
        position:fixed;
        font-size:30px;
        padding:30px;
        width:${window.length};
        right:-19px;
        bottom:50%;
        display: ${this.Current == this.Images.length - 1 ? "none" : "flex"};
      }


    </style>
      <img id="image" src="${this.Images[this.Current]}">
      <div id="Left"><</div>
      <div id="Right">></div>

      <div class="wrapper">
        <div class="wrapImage">          
          ${this.Images.map((x, i) => html`
          <div class="wrap-image" ?active=${this.Current == i} @click=${() => { this.Current = i }}>
            <img src=${x}>
          </div>
        `)}
        </div>
      </div>
    `;
  }

}

@CustomElement
class Slider extends OArkonElement {
  @Property Current: number = 0;

  @Property Images: string[] = ["https://picsum.photos/1920/1080/?random", "https://picsum.photos/g/668/554", "http://image.istanbul.net.tr/uploads/2017/12/event/masterpiece-galata-resim-kedi.jpg", "https://ifyazilim.nyc3.digitaloceanspaces.com/EtkIO/PublicDepo/EtkinlikAfis/2016/12/masterpiece-at-51062.jpg"];


  @Event("click", "#image")
  ImageClick(Event: MouseEvent) {
    window.Modal.ModalOpen(Event, html`<oarkon-slider-modal .Current=${this.Current} .Images=${this.Images}></oarkon-slider-modal>`);
  }

  Render() {
    return html`
      <img id="image" src="${this.Images[this.Current]}" style="width:100%;max-width:300px">
    `;
  }
}


/*  */
/* //ANCHOR Managers==================== */
/*  */

@Execute
class Body extends ViewManager {

  Render() {
    return html`
    ${ new Test}
    <oarkon-button> </oarkon-button>
    ${ new Navbar}
    <oarkon-slider> </oarkon-slider>
      `;
  }
}

@Execute
class Meta extends MetaManager {
  Title = "Test";
  Manifest = {
    description: "test page"
  };

  Render() {
    return html`
    ${ super.Render()}
    <style>
      html, body {
      margin: 0;
    }
    </style>
      `;
  }
}

/*  opacity: ${this.HoverStatus ? .2 : 1};
 */

 /* Opacıty 0 yap pointer none transition ekleyebilirsin */
/* 
<!--modal.prototype.render --> */
/*
    modalImage.src = this.src;
    const captionSlider = document.getElementById("caption");
    captionSlider.innerHTML = this.alt; */