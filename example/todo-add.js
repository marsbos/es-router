import { LitElement } from '../node_modules/lit-element/lit-element.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { route } from '../src/es-route.js';

customElements.define('todo-add', class extends LitElement {

  static get properties() {
    return {
      head: String,
      tail: String,
    }
  }

  connectedCallback() {
    const unregister = route() // returns proxy: {}
    ['292828282'](({ head, tail }) => {
      return async()=>{
        await import('./todo-details.js');
        return `<todo-details .route="${head}"></todo-details>`;
      }
    })
    .use(tpl => {
      this.renderRoot.querySelectorAll('#routes').item(0).innerHTML = tpl;
      this.requestUpdate();
    });
    super.connectedCallback();
  }

  render() {
    return html`
      <div>
        Add todo. On route: ${this.head}
        tail: ${this.tail}
      </div>
      <div id="routes"></div>
    `;
  }
});
