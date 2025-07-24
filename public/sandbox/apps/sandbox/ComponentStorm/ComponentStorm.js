//import * as React from 'react';

export const hello = "Hello World";

customElements.define('bm-map', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<h1>Hello bm-map</h1>`;
      console.log("attr param: ", this.getAttribute("param"))
    }
});
