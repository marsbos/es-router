import { LitElement } from '../node_modules/lit-element/lit-element.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { route } from '../src/es-route.js';

customElements.define('todo-details', class extends LitElement {

  static get properties() {
    return {
      route: Object,
    }
  }

  connectedCallback() {
    
    super.connectedCallback();
  }

  render() {
    return html`
      <div>
        Details todo. On route: ${this.route}
        tail: ${this.route}
      </div>
    `;
  }
});
