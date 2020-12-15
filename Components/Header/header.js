const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <link rel="stylesheet" href="../components/Header/header.css" type="text/css">
  <header-with-menu>
  <div class="menuContainer">
      <div class="logo"><img src="img/logo.jpeg" alt="The Famous Circus Restaurant" width="30px" height="30px"></div>
      <div>
          <nav>
              <ul class="navLinks">
                  <li id="Home"><a href="home.html">Home</a></li>
                  <li id="Shows"><a href="shows.html">Shows</a></li>
                  <li id="Menu"><a href="menu.html">Menu</a></li>
                  <li id="Gallery"><a href="gallery.html">Gallery</a></li>
                  <li id="Contact"><a href="contact.html">Contact us</a></li>
              </ul>
          </nav>
      </div>
  </div>
  </header-with-menu>
`;

class Header extends HTMLElement {
    constructor() {
        super();
        let selected = this.getAttribute("selected");
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
        var style = document.createElement( 'style' )
        style.innerHTML = ".navLinks #"+selected+"{ pointer-events: none; cursor: default; font-weight: bold;}";
        shadowRoot.appendChild( style );
    }
}

customElements.define('header-component', Header);